import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('completion helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates completion items and lists with extra fields intact', async () => {
    class CompletionItem {
      constructor(
        public readonly label: string,
        public readonly kind?: number,
      ) {}
    }

    class CompletionList<T> {
      constructor(
        public readonly items: T[],
        public readonly isIncomplete?: boolean,
      ) {}
    }

    vi.doMock('vscode', () => ({
      CompletionItem,
      CompletionList,
    }))
    vi.doMock('../src/createSnippetString', () => ({
      createSnippetString: vi.fn((value: string) => `snippet:${value}`),
    }))

    const { createCompletionItem } = await import('../src/createCompletionItem')
    const { createCompletionList } = await import('../src/createCompletionList')

    const item = createCompletionItem<{ id: number }, { source: string }>({
      content: 'hello',
      snippet: 'world',
      source: 'test',
      params: { id: 1 },
    })
    const list = createCompletionList<{ id: number }, { source: string }>([
      {
        content: 'hello',
        snippet: 'world',
        source: 'test',
        params: { id: 1 },
      },
    ], true)

    expect(item.insertText).toBe('snippet:world')
    expect(item.source).toBe('test')
    expect(item.params).toEqual({ id: 1 })
    expect(list.items[0].source).toBe('test')
    expect(list.isIncomplete).toBe(true)
  })

  it('registers completion providers with either trigger chars or resolve handlers', async () => {
    const registerCompletionItemProvider = vi.fn()

    vi.doMock('vscode', () => ({
      languages: {
        registerCompletionItemProvider,
      },
    }))

    const { registerCompletionItemProvider: registerProvider } = await import('../src/registerCompletionItemProvider')
    const provideCompletionItems = vi.fn()
    const resolveCompletionItem = vi.fn()

    registerProvider('typescript', provideCompletionItems, ['.', ':'])
    registerProvider('typescript', provideCompletionItems, resolveCompletionItem, '.')

    expect(registerCompletionItemProvider).toHaveBeenNthCalledWith(
      1,
      'typescript',
      { provideCompletionItems },
      '.',
      ':',
    )
    expect(registerCompletionItemProvider).toHaveBeenNthCalledWith(
      2,
      'typescript',
      { provideCompletionItems, resolveCompletionItem },
      '.',
    )
  })
})
