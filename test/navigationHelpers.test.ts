import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('navigation helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('uses the provided text editor in toLine', async () => {
    const range = { start: { line: 2, character: 0 }, end: { line: 3, character: 0 } }
    const setSelection = vi.fn()

    vi.doMock('vscode', () => ({
      Range: class Range {},
      Position: class Position {},
    }))
    vi.doMock('../src/createRange', () => ({
      createRange: vi.fn(() => range),
    }))
    vi.doMock('../src/setSelection', () => ({
      setSelection,
    }))

    const { toLine } = await import('../src/jumpToLine')
    const textEditor = { id: 'editor' }

    expect(toLine(3, textEditor as never)).toBe(textEditor)

    expect(setSelection).toHaveBeenCalledWith(range, undefined, undefined, textEditor)
  })

  it('treats the provided editor as the current file in jumpToLine', async () => {
    const range = { start: { line: 1, character: 0 }, end: { line: 1, character: 0 } }
    const setSelection = vi.fn()
    const openFile = vi.fn()
    const getCurrentFileUrl = vi.fn(() => '/workspace/current.ts')

    vi.doMock('vscode', () => ({
      Range: class Range {},
      Position: class Position {},
    }))
    vi.doMock('../src/createRange', () => ({
      createRange: vi.fn(() => range),
    }))
    vi.doMock('../src/setSelection', () => ({
      setSelection,
    }))
    vi.doMock('../src/openFile', () => ({
      openFile,
    }))
    vi.doMock('../src/getCurrentFileUrl', () => ({
      getCurrentFileUrl,
    }))

    const { jumpToLine } = await import('../src/jumpToLine')
    const textEditor = { id: 'editor' }

    expect(jumpToLine(2, undefined, { textEditor: textEditor as never })).toBe(textEditor)

    expect(getCurrentFileUrl).toHaveBeenCalledWith(false, textEditor)
    expect(setSelection).toHaveBeenCalledWith(range, undefined, undefined, textEditor)
    expect(openFile).not.toHaveBeenCalled()
  })
})
