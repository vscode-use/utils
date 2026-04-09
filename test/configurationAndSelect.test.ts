import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('configuration and select helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('updates useConfiguration when the scoped config changes', async () => {
    let configListener: ((event: { affectsConfiguration: (scope: string) => boolean }) => void) | undefined
    const getConfiguration = vi.fn()
      .mockReturnValueOnce('light')
      .mockReturnValueOnce('dark')
    const dispose = vi.fn()

    vi.doMock('../src/addEventListener', () => ({
      addEventListener: vi.fn((type, callback) => {
        if (type === 'config-change')
          configListener = callback
        return { dispose }
      }),
    }))
    vi.doMock('../src/getConfiguration', () => ({
      getConfiguration,
    }))

    const { useConfiguration } = await import('../src/useConfiguration')

    const state = useConfiguration<string>('theme.mode', 'light')
    expect(state()).toBe('light')

    configListener?.({
      affectsConfiguration: scope => scope === 'theme',
    })

    expect(state()).toBe('dark')

    state.dispose()
    configListener?.({
      affectsConfiguration: scope => scope === 'theme',
    })

    expect(dispose).toHaveBeenCalledTimes(1)
    expect(state()).toBe('dark')
  })

  it('returns preset selections for multi-select quick picks without a selection-change event', async () => {
    const quickPick = createQuickPickMock()

    vi.doMock('vscode', () => ({
      window: {
        createQuickPick: () => quickPick,
      },
    }))

    const { createSelect } = await import('../src/createSelect')

    const promise = createSelect([
      { label: 'vue', picked: true },
      { label: 'react' },
    ], {
      canSelectMany: true,
    })

    quickPick.triggerAccept()

    await expect(promise).resolves.toEqual(['vue'])
    expect(quickPick.disposed).toBe(true)
  })

  it('returns the active item label for single-select quick picks without a selection-change event', async () => {
    const quickPick = createQuickPickMock()

    vi.doMock('vscode', () => ({
      window: {
        createQuickPick: () => quickPick,
      },
    }))

    const { createSelect } = await import('../src/createSelect')

    const promise = createSelect(['vue', 'react'], {
      activeItems: ['react'],
    })

    quickPick.triggerAccept()

    await expect(promise).resolves.toBe('react')
    expect(quickPick.disposed).toBe(true)
  })
})

function createQuickPickMock() {
  type Listener<T = void> = (value: T) => void

  const changeSelectionListeners: Listener<readonly { label: string }[]>[] = []
  const acceptListeners: Listener[] = []
  const hideListeners: Listener[] = []
  const triggerButtonListeners: Listener[] = []
  const triggerItemButtonListeners: Listener[] = []
  const changeActiveListeners: Listener<readonly { label: string }[]>[] = []
  const changeValueListeners: Listener<string>[] = []

  return {
    items: [] as readonly { label: string, picked?: boolean }[],
    activeItems: [] as readonly { label: string }[],
    selectedItems: [] as readonly { label: string, picked?: boolean }[],
    canSelectMany: false,
    title: undefined as string | undefined,
    value: '',
    placeholder: undefined as string | undefined,
    buttons: [] as readonly unknown[],
    matchOnDescription: false,
    keepScrollPosition: false,
    ignoreFocusOut: false,
    disposed: false,
    onDidChangeSelection(listener: Listener<readonly { label: string }[]>) {
      changeSelectionListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidAccept(listener: Listener) {
      acceptListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidHide(listener: Listener) {
      hideListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidTriggerButton(listener: Listener) {
      triggerButtonListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidTriggerItemButton(listener: Listener) {
      triggerItemButtonListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidChangeActive(listener: Listener<readonly { label: string }[]>) {
      changeActiveListeners.push(listener)
      return { dispose: vi.fn() }
    },
    onDidChangeValue(listener: Listener<string>) {
      changeValueListeners.push(listener)
      return { dispose: vi.fn() }
    },
    show() {},
    hide() {
      hideListeners.forEach(listener => listener())
    },
    dispose() {
      this.disposed = true
    },
    triggerAccept() {
      acceptListeners.forEach(listener => listener())
    },
    triggerSelection(items: readonly { label: string }[]) {
      this.selectedItems = items
      changeSelectionListeners.forEach(listener => listener(items))
    },
  }
}
