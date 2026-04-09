import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('inline and inlay helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates inlay hints with the provided options applied', async () => {
    const InlayHint = vi.fn(function(this: Record<string, unknown>, position: unknown, label: unknown, kind: unknown) {
      this.position = position
      this.label = label
      this.kind = kind
    })

    vi.doMock('vscode', () => ({
      InlayHint,
    }))

    const { createInlayHint } = await import('../src/createInlayHint')

    const position = { line: 1, character: 2 } as never
    const tooltip = 'demo'
    const textEdits = [{ newText: 'x' }] as never

    expect(createInlayHint({
      position,
      label: 'hint',
      kind: 1 as never,
      tooltip,
      textEdits,
      paddingLeft: true,
      paddingRight: false,
    })).toMatchObject({
      position,
      label: 'hint',
      kind: 1,
      tooltip,
      textEdits,
      paddingLeft: true,
      paddingRight: false,
    })
  })

  it('creates inline completion items and lists while preserving params', async () => {
    const InlineCompletionItem = vi.fn(function(this: Record<string, unknown>, insertText: unknown, range: unknown, command: unknown) {
      this.insertText = insertText
      this.range = range
      this.command = command
    })
    const InlineCompletionList = vi.fn(function(this: Record<string, unknown>, items: unknown[]) {
      this.items = items
    })

    vi.doMock('vscode', () => ({
      InlineCompletionItem,
      InlineCompletionList,
    }))
    vi.doMock('../src/createSnippetString', () => ({
      createSnippetString: vi.fn((value: string) => `snippet:${value}`),
    }))

    const { createInlineCompletionItem } = await import('../src/createInlineCompletionItem')
    const { createInlineCompletionList } = await import('../src/createInlineCompletionList')

    const range = { start: 0, end: 1 } as never
    const command = { command: 'utils.run' } as never

    const item = createInlineCompletionItem({
      insertText: 'hello',
      insertAsSnippet: true,
      range,
      command,
      params: 'payload',
    })
    const list = createInlineCompletionList([
      {
        insertText: 'world',
        params: ['a', 'b'],
      },
    ])

    expect(item).toMatchObject({
      insertText: 'hello',
      insertAsSnippet: true,
      range,
      command,
      params: 'payload',
    })
    expect(InlineCompletionItem).toHaveBeenNthCalledWith(1, 'snippet:hello', range, command)
    expect(list.items[0]).toMatchObject({
      insertText: 'world',
      params: ['a', 'b'],
    })
  })

  it('registers inline completion providers through vscode languages', async () => {
    const disposable = { dispose: vi.fn() }
    const registerInlineCompletionItemProvider = vi.fn(() => disposable)

    vi.doMock('vscode', () => ({
      languages: {
        registerInlineCompletionItemProvider,
      },
    }))

    const { registerInlineCompletionItemProvider: registerProvider } = await import('../src/registerInlineCompletionItemProvider')
    const provideInlineCompletionItems = vi.fn()

    expect(registerProvider(provideInlineCompletionItems, 'typescript')).toBe(disposable)
    expect(registerInlineCompletionItemProvider).toHaveBeenCalledWith('typescript', {
      provideInlineCompletionItems,
    })
  })
})
