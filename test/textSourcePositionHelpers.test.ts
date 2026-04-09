import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('text source position helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads position information from the provided text editor', async () => {
    vi.doMock('vscode', () => ({
      Position: class Position {
        constructor(
          public line: number,
          public character: number,
        ) {}
      },
    }))

    const textEditor = {
      document: {
        getText: vi.fn(() => 'hello\nworld'),
      },
    }

    const { getPosition } = await import('../src/getPosition')

    expect(getPosition(7, textEditor as never)).toMatchObject({
      line: 1,
      column: 1,
      character: 1,
      offset: 7,
      position: { line: 1, character: 1 },
    })
  })

  it('reads before and after code slices from the provided text editor', async () => {
    const position = { line: 1, character: 2 } as never
    const getOffsetFromPosition = vi.fn(() => 8)
    const textEditor = {
      document: {
        getText: vi.fn(() => 'hello\nworld'),
      },
    }

    vi.doMock('../src/getOffsetFromPosition', () => ({
      getOffsetFromPosition,
    }))

    const { getPositionAfterCode } = await import('../src/getPositionAfterCode')
    const { getPositionBeforeCode } = await import('../src/getPositionBeforeCode')

    expect(getPositionBeforeCode(position, textEditor as never)).toBe('hello\nwo')
    expect(getPositionAfterCode(position, textEditor as never)).toBe('rld')
    expect(getOffsetFromPosition).toHaveBeenCalledTimes(2)
  })

  it('uses the provided text editor in getCalcPosition', async () => {
    const getOffsetFromPosition = vi.fn(() => 3)
    const getPosition = vi.fn(() => ({ line: 0, column: 5 }))
    const textEditor = {
      document: {
        getText: vi.fn(() => 'custom text'),
      },
    }

    vi.doMock('../src/getOffsetFromPosition', () => ({
      getOffsetFromPosition,
    }))
    vi.doMock('../src/getPosition', () => ({
      getPosition,
    }))
    vi.doMock('../src/createPosition', () => ({
      createPosition: vi.fn(() => ({ line: 0, character: 2 })),
    }))

    const { getCalcPosition } = await import('../src/getCalcPosition')

    expect(getCalcPosition([1, 2], 2, textEditor as never)).toEqual({ line: 0, column: 5 })
    expect(getOffsetFromPosition).toHaveBeenCalledWith({ line: 0, character: 2 }, 'custom text')
    expect(getPosition).toHaveBeenCalledWith(5, 'custom text')
  })
})
