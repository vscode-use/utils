import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('range position helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('uses the provided code for offset-based isInPosition checks', async () => {
    const getOffsetFromPosition = vi.fn((position: { line: number, character?: number, column?: number }, source?: string) => {
      const character = position.character ?? position.column ?? 0
      if (source === 'cdefgh')
        return character === 1 ? 1 : 4
      if (source === 'abcdefgh')
        return 4
      return 0
    })

    vi.doMock('../src/createPosition', () => ({
      createPosition: vi.fn((lineOrPosition: number | { line: number, character?: number, column?: number }, character?: number) => {
        if (typeof lineOrPosition === 'number')
          return { line: lineOrPosition, character }
        return lineOrPosition
      }),
    }))
    vi.doMock('../src/getOffsetFromPosition', () => ({
      getOffsetFromPosition,
    }))
    vi.doMock('../src/getActiveText', () => ({
      getActiveText: vi.fn(() => {
        throw new Error('should not read active text')
      }),
    }))

    const { isInPosition } = await import('../src/isInPosition')

    expect(isInPosition(
      {
        start: { line: 2, character: 1 },
        end: { line: 2, character: 4 },
      },
      { line: 1, character: 3 },
      2,
      1,
      0,
      0,
      'abcdefgh',
    )).toBe(true)

    expect(getOffsetFromPosition).toHaveBeenNthCalledWith(1, { line: 1, character: 1 }, 'cdefgh')
    expect(getOffsetFromPosition).toHaveBeenNthCalledWith(2, { line: 1, character: 3 }, 'abcdefgh')
    expect(getOffsetFromPosition).toHaveBeenNthCalledWith(3, { line: 1, character: 4 }, 'cdefgh')
  })
})
