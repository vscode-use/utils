import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('vscode object factories', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates a configured status bar item', async () => {
    const statusBarItem = {}
    const createStatusBarItem = vi.fn(() => statusBarItem)

    vi.doMock('vscode', () => ({
      window: {
        createStatusBarItem,
      },
    }))

    const { createBottomBar } = await import('../src/createBottomBar')

    expect(
      createBottomBar({
        position: 'right',
        offset: 3,
        text: 'ready',
        tooltip: 'demo',
        color: '#fff',
        backgroundColor: 'statusBarItem.warningBackground' as never,
        accessibilityInformation: { label: 'ready' } as never,
        command: 'utils.run',
      }),
    ).toBe(statusBarItem)

    expect(createStatusBarItem).toHaveBeenCalledWith(2, 3)
    expect(statusBarItem).toMatchObject({
      text: 'ready',
      tooltip: 'demo',
      color: '#fff',
      backgroundColor: 'statusBarItem.warningBackground',
      accessibilityInformation: { label: 'ready' },
      command: 'utils.run',
    })
  })

  it('creates code lens, hover, markdown, and snippet objects', async () => {
    const CodeLens = vi.fn(function(this: Record<string, unknown>, range: unknown, command: unknown) {
      this.range = range
      this.command = command
    })
    const Hover = vi.fn(function(this: Record<string, unknown>, contents: unknown, range: unknown) {
      this.contents = contents
      this.range = range
    })
    const MarkdownString = vi.fn(function(this: Record<string, unknown>) {
      this.isTrusted = false
      this.supportHtml = false
    })
    const SnippetString = vi.fn(function(this: Record<string, unknown>, value: string) {
      this.value = value
    })

    vi.doMock('vscode', () => ({
      CodeLens,
      Hover,
      MarkdownString,
      SnippetString,
    }))

    const { createCodeLens } = await import('../src/createCodeLens')
    const { createHover } = await import('../src/createHover')
    const { createMarkdownString } = await import('../src/createMarkdownString')
    const { createSnippetString } = await import('../src/createSnippetString')

    const range = { start: 1, end: 2 } as never
    const command = { command: 'utils.run', title: 'Run' } as never

    expect(createCodeLens(range, command)).toMatchObject({ range, command })
    expect(createHover('hello' as never, range)).toMatchObject({ contents: 'hello', range })
    expect(createMarkdownString()).toMatchObject({ isTrusted: true, supportHtml: true })
    expect(createSnippetString(['a', 'b'])).toMatchObject({ value: 'a\nb' })
  })

  it('creates decoration types for styles and color squares', async () => {
    const decorationType = { dispose: vi.fn() }
    const createTextEditorDecorationType = vi.fn(() => decorationType)

    vi.doMock('vscode', () => ({
      DecorationRangeBehavior: {
        ClosedClosed: 0,
      },
      window: {
        createTextEditorDecorationType,
      },
    }))

    const { createStyle } = await import('../src/createStyle')
    const { createSquare } = await import('../src/createSquare')

    expect(createStyle({ border: '1px solid red' })).toBe(decorationType)
    expect(createSquare('#f00')).toBe(decorationType)

    expect(createTextEditorDecorationType).toHaveBeenNthCalledWith(1, {
      rangeBehavior: 0,
      border: '1px solid red',
    })
    expect(createTextEditorDecorationType).toHaveBeenNthCalledWith(2, {
      before: {
        contentText: '',
        margin: '0 0.2em',
        width: '0.8em',
        height: '0.8em',
        backgroundColor: '#f00',
      },
    })
  })
})
