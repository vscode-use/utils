import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('position helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('passes the provided content through getCalcPosition offset calculation', async () => {
    const getOffsetFromPosition = vi.fn(() => 3)
    const getPosition = vi.fn(() => ({ line: 0, column: 5 }))

    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
    }))
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

    expect(getCalcPosition([1, 2], 2, 'custom text')).toEqual({ line: 0, column: 5 })
    expect(getOffsetFromPosition).toHaveBeenCalledWith({ line: 0, character: 2 }, 'custom text')
    expect(getPosition).toHaveBeenCalledWith(5, 'custom text')
  })
})
