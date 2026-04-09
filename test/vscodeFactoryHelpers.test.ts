import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('vscode factory helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates an output channel through vscode window', async () => {
    const outputChannel = { appendLine: vi.fn() }
    const createOutputChannel = vi.fn(() => outputChannel)

    vi.doMock('vscode', () => ({
      window: {
        createOutputChannel,
      },
    }))

    const { createOutputChannel: createChannel } = await import('../src/createOutputChannel')

    expect(createChannel('utils', 'typescript')).toBe(outputChannel)
    expect(createOutputChannel).toHaveBeenCalledWith('utils', 'typescript')
  })

  it('creates a terminal through vscode window', async () => {
    const terminal = { show: vi.fn() }
    const createTerminal = vi.fn(() => terminal)

    vi.doMock('vscode', () => ({
      window: {
        createTerminal,
      },
    }))

    const { createTerminal: createWrappedTerminal } = await import('../src/createTerminal')

    expect(createWrappedTerminal('utils', { cwd: '/tmp' } as never)).toBe(terminal)
    expect(createTerminal).toHaveBeenCalledWith({
      name: 'utils',
      cwd: '/tmp',
    })
  })

  it('reads the current locale from vscode env', async () => {
    vi.doMock('vscode', () => ({
      env: {
        language: 'zh-cn',
      },
    }))

    const { getLocale } = await import('../src/getLocale')

    expect(getLocale()).toBe('zh-cn')
  })
})
