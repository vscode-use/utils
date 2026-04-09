import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('editor getter helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('reads editor-scoped values from the provided text editor', async () => {
    const workspace = {
      workspaceFolders: [{}],
      getWorkspaceFolder: vi.fn(() => ({
        uri: {
          fsPath: '/workspace',
          scheme: 'file',
        },
      })),
    }

    vi.doMock('vscode', () => ({
      window: {
        activeTextEditor: undefined,
      },
      workspace,
    }))

    const { getActiveText } = await import('../src/getActiveText')
    const { getActiveTextEditorLanguageId } = await import('../src/getActiveTextEditorLanguageId')
    const { getCurrentFileUrl } = await import('../src/getCurrentFileUrl')
    const { getKeyWords } = await import('../src/getKeyWords')
    const { getLineText } = await import('../src/getLineText')
    const { getRootPath } = await import('../src/getRootPath')
    const { getWordRangeAtPosition } = await import('../src/getWordRangeAtPosition')

    const range = { start: { line: 0, character: 0 }, end: { line: 0, character: 5 } }
    const position = { line: 0, character: 1 } as never
    const textEditor = {
      document: {
        languageId: 'typescript',
        uri: {
          fsPath: '/workspace/src/example.ts',
          scheme: 'file',
        },
        getText: vi.fn((input?: typeof range) => input ? 'hello' : 'hello world\nsecond line'),
        lineAt: vi.fn((line: number) => ({ text: line === 1 ? 'second line' : 'hello world' })),
        getWordRangeAtPosition: vi.fn(() => range),
      },
    }

    expect(getActiveText(textEditor as never)).toBe('hello world\nsecond line')
    expect(getLineText(1, textEditor as never)).toBe('second line')
    expect(getActiveTextEditorLanguageId(textEditor as never)).toBe('typescript')
    expect(getWordRangeAtPosition(position, textEditor as never)).toBe(range)
    expect(getKeyWords(position, textEditor as never)).toBe('hello')
    expect(getCurrentFileUrl(false, textEditor as never)).toBe('/workspace/src/example.ts')
    expect(getCurrentFileUrl(true, textEditor as never)).toEqual({
      fsPath: '/workspace/src/example.ts',
      scheme: 'file',
    })
    expect(getRootPath(false, textEditor as never)).toBe('/workspace')
    expect(getRootPath(true, textEditor as never)).toEqual({
      fsPath: '/workspace',
      scheme: 'file',
    })

    expect(workspace.getWorkspaceFolder).toHaveBeenCalledWith(textEditor.document.uri)
  })
})
