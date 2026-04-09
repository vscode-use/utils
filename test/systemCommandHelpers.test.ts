import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('system command helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('folds and unfolds each provided range through editor commands', async () => {
    const executeCommand = vi.fn(() => Promise.resolve())
    const ranges = [
      { start: { line: 1 }, end: { line: 3 } },
      { start: { line: 5 }, end: { line: 8 } },
    ] as never

    vi.doMock('vscode', () => ({
      commands: {
        executeCommand,
      },
    }))

    const { onFold } = await import('../src/onFold')
    const { unFold } = await import('../src/unFold')

    await Promise.all(onFold(ranges))
    await Promise.all(unFold(ranges))

    expect(executeCommand).toHaveBeenNthCalledWith(1, 'editor.fold', {
      selectionLines: [1, 3],
    })
    expect(executeCommand).toHaveBeenNthCalledWith(2, 'editor.fold', {
      selectionLines: [5, 8],
    })
    expect(executeCommand).toHaveBeenNthCalledWith(3, 'editor.unfold', {
      selectionLines: [1, 3],
    })
    expect(executeCommand).toHaveBeenNthCalledWith(4, 'editor.unfold', {
      selectionLines: [5, 8],
    })
  })

  it('reads and writes clipboard text through vscode env', async () => {
    const writeText = vi.fn(() => Promise.resolve())
    const readText = vi.fn(() => Promise.resolve('copied text'))

    vi.doMock('vscode', () => ({
      env: {
        clipboard: {
          writeText,
          readText,
        },
      },
    }))

    const { getCopyText } = await import('../src/getCopyText')
    const { setCopyText } = await import('../src/setCopyText')

    await setCopyText('hello')
    await expect(getCopyText()).resolves.toBe('copied text')

    expect(writeText).toHaveBeenCalledWith('hello')
    expect(readText).toHaveBeenCalledTimes(1)
  })

  it('renames files through the workspace fs api', async () => {
    const renameFile = vi.fn(() => Promise.resolve())

    vi.doMock('vscode', () => ({
      workspace: {
        fs: {
          rename: renameFile,
        },
      },
    }))

    const { rename } = await import('../src/rename')
    const oldUri = { path: '/old' } as never
    const newUri = { path: '/new' } as never

    await rename(oldUri, newUri, { overwrite: true })

    expect(renameFile).toHaveBeenCalledWith(oldUri, newUri, { overwrite: true })
  })
})
