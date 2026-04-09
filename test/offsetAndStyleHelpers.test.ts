import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('offset and style helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads the offset from the provided text editor', async () => {
    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
    }))

    const position = { line: 1, character: 2 } as never
    const offsetAt = vi.fn(() => 17)
    const textEditor = {
      document: {
        offsetAt,
      },
    }

    const { getOffsetFromPosition } = await import('../src/getOffsetFromPosition')

    expect(getOffsetFromPosition(position, textEditor as never)).toBe(17)
    expect(offsetAt).toHaveBeenCalledWith(position)
  })

  it('applies and clears decorations on the provided text editor', async () => {
    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
    }))

    const decorationType = { key: 'decoration' } as never
    const range = { start: 0, end: 1 } as never
    const textEditor = {
      setDecorations: vi.fn(),
    }

    const { setStyle } = await import('../src/setStyle')

    const clear = setStyle(decorationType, range, textEditor as never)

    expect(textEditor.setDecorations).toHaveBeenNthCalledWith(1, decorationType, [range])

    clear?.()

    expect(textEditor.setDecorations).toHaveBeenNthCalledWith(2, decorationType, [])
  })
})
