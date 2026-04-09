import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('visible range helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads visible ranges from the provided text editor', async () => {
    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
    }))

    const start = { line: 1, character: 0 }
    const middleEnd = { line: 5, character: 3 }
    const end = { line: 9, character: 4 }
    const textEditor = {
      visibleRanges: [
        { start, end: middleEnd },
        { start: { line: 7, character: 1 }, end },
      ],
    }

    const { getVisibleRange } = await import('../src/getVisibleRange')

    expect(getVisibleRange(textEditor as never)).toEqual({
      start,
      end,
      ranges: textEditor.visibleRanges,
    })
  })

  it('writes selection to the provided text editor and reveals the range', async () => {
    vi.doMock('vscode', () => createSelectionVscodeMock())

    const { setSelection } = await import('../src/setSelection')
    const textEditor = {
      selection: undefined,
      revealRange: vi.fn(),
    } as { selection?: unknown, revealRange: ReturnType<typeof vi.fn> }

    setSelection([1, 2], [3, 4], 'left', 7 as never, textEditor as never)

    expect(textEditor.selection).toMatchObject({
      anchor: { line: 3, character: 4 },
      active: { line: 1, character: 2 },
    })
    expect(textEditor.revealRange).toHaveBeenCalledWith(
      expect.objectContaining({
        start: { line: 1, character: 2 },
        end: { line: 3, character: 4 },
      }),
      7,
    )
  })

  it('updates useVisibleRange for the matching editor and stops after dispose', async () => {
    let visibleRangeListener: ((event: { textEditor: { id: string } }) => void) | undefined
    const dispose = vi.fn()
    const getVisibleRange = vi.fn()
      .mockReturnValueOnce({ start: 0, end: 1 })
      .mockReturnValueOnce({ start: 2, end: 3 })

    vi.doMock('../src/addEventListener', () => ({
      addEventListener: vi.fn((type, callback) => {
        if (type === 'text-visible-change')
          visibleRangeListener = callback
        return { dispose }
      }),
    }))
    vi.doMock('../src/getVisibleRange', () => ({
      getVisibleRange,
    }))

    const { useVisibleRange } = await import('../src/useVisibleRange')
    const editor = { id: 'one' }
    const state = useVisibleRange(editor as never)

    expect(state()).toEqual({ start: 0, end: 1 })

    visibleRangeListener?.({ textEditor: { id: 'other' } })
    expect(state()).toEqual({ start: 0, end: 1 })

    visibleRangeListener?.({ textEditor: editor })
    expect(state()).toEqual({ start: 2, end: 3 })

    state.dispose()
    visibleRangeListener?.({ textEditor: editor })

    expect(dispose).toHaveBeenCalledTimes(1)
    expect(state()).toEqual({ start: 2, end: 3 })
  })
})

function createSelectionVscodeMock() {
  class Position {
    constructor(
      public line: number,
      public character: number,
    ) {}
  }

  class Range {
    start: Position
    end: Position

    constructor(start: Position, end: Position) {
      this.start = start
      this.end = end
    }
  }

  class Selection extends Range {
    anchor: Position
    active: Position

    constructor(anchor: Position, active: Position) {
      const [start, end] = comparePosition(anchor, active) <= 0
        ? [anchor, active]
        : [active, anchor]
      super(start, end)
      this.anchor = anchor
      this.active = active
    }
  }

  return {
    Position,
    Range,
    Selection,
    TextEditorRevealType: {
      Default: 0,
    },
  }
}

function comparePosition(a: { line: number, character: number }, b: { line: number, character: number }) {
  if (a.line !== b.line)
    return a.line - b.line
  return a.character - b.character
}
