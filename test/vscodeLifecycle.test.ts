import { beforeEach, describe, expect, it, vi } from 'vitest'

function setupVscodeMock() {
  let authListener: ((event: { provider: { id: string } }) => void) | undefined
  let activeTextListener: ((editor: { document: { fileName: string } } | undefined) => void) | undefined
  let activeTextEditor: { document: { fileName: string } } | undefined

  class Disposable {
    constructor(private readonly onDispose: () => void = () => {}) {}

    dispose() {
      this.onDispose()
    }
  }

  const registerCommand = vi.fn((name: string) => new Disposable(() => name))
  const getSession = vi.fn()
  const onDidChangeSessions = vi.fn((listener: (event: { provider: { id: string } }) => void) => {
    authListener = listener
    return new Disposable()
  })
  const onDidChangeActiveTextEditor = vi.fn((listener: (editor: { document: { fileName: string } } | undefined) => void) => {
    activeTextListener = listener
    return new Disposable()
  })

  vi.doMock('vscode', () => ({
    Disposable,
    authentication: {
      getSession,
      onDidChangeSessions,
    },
    commands: {
      registerCommand,
    },
    window: {
      get activeTextEditor() {
        return activeTextEditor
      },
      onDidChangeActiveTextEditor,
    },
    workspace: {},
  }))

  return {
    getAuthListener: () => authListener,
    getActiveTextListener: () => activeTextListener,
    getSession,
    registerCommand,
    setActiveTextEditor: (editor: { document: { fileName: string } } | undefined) => {
      activeTextEditor = editor
    },
  }
}

describe('vscode lifecycle helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('passes requested auth scopes through getSession', async () => {
    const vscodeMock = setupVscodeMock()
    const { addEventListener } = await import('../src/addEventListener')
    const callback = vi.fn()

    addEventListener('auth-change', callback)
    vscodeMock.getAuthListener()?.({ provider: { id: 'github' } })

    const [providerId, getSession] = callback.mock.calls[0] as [string, (scopes: readonly string[], options?: { silent?: boolean }) => Promise<unknown>]

    expect(providerId).toBe('github')

    await getSession(['repo'], { silent: true })
    expect(vscodeMock.getSession).toHaveBeenCalledWith('github', ['repo'], { silent: true })
  })

  it('collects effects registered after activate into context subscriptions', async () => {
    const vscodeMock = setupVscodeMock()
    const { createExtension } = await import('../src/createExtension')
    const { registerCommand } = await import('../src/registerCommand')
    const context = { subscriptions: [] as unknown[] }

    const extension = createExtension(() => {
      registerCommand('initial', () => {})
    })

    await extension.activate(context as never)
    const initialLength = context.subscriptions.length

    const laterDisposable = registerCommand('later', () => {})

    expect(vscodeMock.registerCommand).toHaveBeenCalledTimes(2)
    expect(context.subscriptions.length).toBe(initialLength + 1)
    expect(context.subscriptions).toContain(laterDisposable)
  })

  it('passes undefined through activeText-change listeners', async () => {
    const vscodeMock = setupVscodeMock()
    const { addEventListener } = await import('../src/addEventListener')
    const callback = vi.fn()

    addEventListener('activeText-change', callback)
    vscodeMock.getActiveTextListener()?.(undefined)

    expect(callback).toHaveBeenCalledWith(undefined)
  })

  it('updates useActiveTextEditor when the active editor changes', async () => {
    const vscodeMock = setupVscodeMock()
    const firstEditor = { document: { fileName: 'first.ts' } }
    const secondEditor = { document: { fileName: 'second.ts' } }

    vscodeMock.setActiveTextEditor(firstEditor)

    const { useActiveTextEditor } = await import('../src/useActiveTextEditor')
    const state = useActiveTextEditor()

    expect(state()).toBe(firstEditor)

    vscodeMock.setActiveTextEditor(secondEditor)
    vscodeMock.getActiveTextListener()?.(secondEditor)
    expect(state()).toBe(secondEditor)

    state.dispose()
    vscodeMock.setActiveTextEditor(undefined)
    vscodeMock.getActiveTextListener()?.(undefined)

    expect(state()).toBe(secondEditor)
  })
})
