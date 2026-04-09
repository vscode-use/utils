import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('range and selection factories', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates ranges and selections from normalized positions', async () => {
    const Position = vi.fn(function(this: Record<string, unknown>, line: number, character: number) {
      this.line = line
      this.character = character
    })
    const Range = vi.fn(function(this: Record<string, unknown>, start: unknown, end: unknown) {
      this.start = start
      this.end = end
    })
    const Selection = vi.fn(function(this: Record<string, unknown>, start: unknown, end: unknown) {
      this.start = start
      this.end = end
    })

    vi.doMock('vscode', () => ({
      Position,
      Range,
      Selection,
    }))

    const { createRange } = await import('../src/createRange')
    const { createSelection } = await import('../src/createSelection')

    expect(createRange([1, 2], [3, 4])).toMatchObject({
      start: { line: 1, character: 2 },
      end: { line: 3, character: 4 },
    })
    expect(createSelection([5, 6], [7, 8])).toMatchObject({
      start: { line: 5, character: 6 },
      end: { line: 7, character: 8 },
    })

    expect(Range).toHaveBeenCalledTimes(1)
    expect(Selection).toHaveBeenCalledTimes(1)
  })
})
