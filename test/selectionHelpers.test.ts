import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('selection helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads selection info from the provided text editor', async () => {
    vi.doMock('vscode', () => createSelectionVscodeMock())

    const { getSelection } = await import('../src/getSelection')
    const { Position, Selection } = await import('vscode')

    const code = 'hello world\nsecond line'
    const firstSelection = new Selection(new Position(0, 0), new Position(0, 5))
    const secondSelection = new Selection(new Position(1, 0), new Position(1, 6))
    const textEditor = {
      selection: secondSelection,
      selections: [firstSelection, secondSelection],
      document: createDocumentMock(code),
    } as never

    const result = getSelection(textEditor)

    expect(result).toMatchObject({
      line: 1,
      character: 6,
      lineText: 'second line',
      selectedTextArray: ['hello', 'second'],
    })
    expect(result?.selectionArray[0]).toMatchObject({
      lineText: 'hello world',
      text: 'hello',
    })
    expect(result?.selectionArray[1]).toMatchObject({
      lineText: 'second line',
      text: 'second',
    })
  })

  it('writes selections to the provided text editor', async () => {
    vi.doMock('vscode', () => createSelectionVscodeMock())

    const { setSelections } = await import('../src/setSelections')
    const textEditor = {
      selections: [],
    } as { selections: unknown[] }

    setSelections([
      { start: [0, 0], end: [0, 5] },
      { start: [1, 0], end: [1, 6], position: 'left' },
    ], textEditor as never)

    expect(textEditor.selections).toHaveLength(2)
  })

  it('updates useSelection for the matching editor and stops after dispose', async () => {
    let selectionListener: ((event: { textEditor: { id: string } }) => void) | undefined
    const dispose = vi.fn()
    const getSelection = vi.fn()
      .mockReturnValueOnce({ line: 0 })
      .mockReturnValueOnce({ line: 1 })

    vi.doMock('../src/addEventListener', () => ({
      addEventListener: vi.fn((type, callback) => {
        if (type === 'selection-change')
          selectionListener = callback
        return { dispose }
      }),
    }))
    vi.doMock('../src/getSelection', () => ({
      getSelection,
    }))

    const { useSelection } = await import('../src/useSelection')
    const editor = { id: 'one' }
    const state = useSelection(editor as never)

    expect(state()).toEqual({ line: 0 })

    selectionListener?.({ textEditor: { id: 'other' } })
    expect(state()).toEqual({ line: 0 })

    selectionListener?.({ textEditor: editor })
    expect(state()).toEqual({ line: 1 })

    state.dispose()
    selectionListener?.({ textEditor: editor })

    expect(dispose).toHaveBeenCalledTimes(1)
    expect(state()).toEqual({ line: 1 })
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
  }
}

function comparePosition(a: { line: number, character: number }, b: { line: number, character: number }) {
  if (a.line !== b.line)
    return a.line - b.line
  return a.character - b.character
}

function createDocumentMock(code: string) {
  const lines = code.split('\n')
  return {
    getText: () => code,
    lineAt: (line: number) => ({ text: lines[line] }),
  }
}
