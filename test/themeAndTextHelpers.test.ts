import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('theme and text helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads, lists, and updates themes', async () => {
    const get = vi.fn(() => 'One Dark Pro')
    const update = vi.fn(() => Promise.resolve())

    vi.doMock('vscode', () => ({
      workspace: {
        getConfiguration: () => ({
          get,
          update,
        }),
      },
      extensions: {
        all: [
          {
            packageJSON: {
              contributes: {
                themes: [
                  { label: 'One Dark Pro', path: './themes/one-dark.json', id: 'one-dark', uiTheme: 'vs-dark' },
                  { label: 'Broken Theme', id: 'broken', uiTheme: 'vs-dark' },
                ],
              },
            },
          },
        ],
      },
      ConfigurationTarget: {
        Global: 'Global',
      },
    }))

    const { useTheme } = await import('../src/useTheme')
    const theme = useTheme()

    expect(theme.getCurrentTheme()).toBe('One Dark Pro')
    expect(theme.getAllTheme()).toEqual([
      { label: 'One Dark Pro', path: './themes/one-dark.json', id: 'one-dark', uiTheme: 'vs-dark' },
    ])

    await theme.setTheme('Solarized Dark')

    expect(update).toHaveBeenNthCalledWith(1, 'workbench.colorTheme', 'Solarized Dark', 'Global')
    expect(update).toHaveBeenNthCalledWith(2, 'workbench.preferredLightColorTheme', 'Solarized Dark', 'Global')
    expect(update).toHaveBeenNthCalledWith(3, 'workbench.preferredDarkColorTheme', 'Solarized Dark', 'Global')
  })

  it('delegates replace and delete operations to the text editor edit builder', async () => {
    const replace = vi.fn()
    const remove = vi.fn()
    const textEditor = {
      edit: vi.fn((callback, options) => {
        callback({
          replace,
          delete: remove,
        })
        return Promise.resolve(true)
      }),
    }
    const range = { start: 0, end: 1 } as never

    const { deleteText, replaceText } = await import('../src/updateText')

    await expect(replaceText(range, 'updated', { textEditor: textEditor as never, undoStopBefore: true, undoStopAfter: true })).resolves.toBe(true)
    expect(replace).toHaveBeenCalledWith(range, 'updated')

    await expect(deleteText(range, { textEditor: textEditor as never, undoStopBefore: false, undoStopAfter: false })).resolves.toBe(true)
    expect(remove).toHaveBeenCalledWith(range)
  })
})
