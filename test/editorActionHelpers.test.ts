import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('editor action helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reveals the provided editor after insertText succeeds', async () => {
    const scrollInToView = vi.fn()

    vi.doMock('vscode', () => ({
      Range: class Range {},
      SnippetString: class SnippetString {
        constructor(public value: string) {}
      },
    }))
    vi.doMock('../src/scrollInToView', () => ({
      scrollInToView,
    }))
    vi.doMock('../src/createRange', () => ({
      createRange: vi.fn(() => ({ start: 0, end: 0 })),
    }))

    const textEditor = {
      insertSnippet: vi.fn(() => Promise.resolve(true)),
    }

    const { insertText } = await import('../src/insertText')

    await expect(insertText('hello', { line: 1, character: 2 } as never, {
      textEditor: textEditor as never,
      scrollInToView: true,
    })).resolves.toBe(true)

    expect(textEditor.insertSnippet).toHaveBeenCalledTimes(1)
    expect(scrollInToView).toHaveBeenCalledWith({ start: 0, end: 0 }, 1, textEditor)
  })

  it('reveals the provided editor in scrollInToView', async () => {
    vi.doUnmock('../src/scrollInToView')
    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
    }))

    const { scrollInToView } = await import('../src/scrollInToView')
    const range = { start: 1, end: 2 } as never
    const textEditor = {
      revealRange: vi.fn(),
    }

    scrollInToView(range, 7 as never, textEditor as never)

    expect(textEditor.revealRange).toHaveBeenCalledWith(range, 7)
  })

  it('saves the provided editor when saveAll is false', async () => {
    const saveAll = vi.fn()
    const nextTick = vi.fn((callback?: () => void) => {
      callback?.()
      return Promise.resolve()
    })

    vi.doMock('vscode', () => ({
      workspace: {
        saveAll,
      },
    }))
    vi.doMock('../src/nextTick', () => ({
      nextTick,
    }))

    const documentSave = vi.fn()
    const textEditor = {
      document: {
        save: documentSave,
      },
    }

    const { saveFile } = await import('../src/saveFile')

    saveFile(false, textEditor as never)

    expect(documentSave).toHaveBeenCalledTimes(1)
    expect(saveAll).not.toHaveBeenCalled()
  })
})
