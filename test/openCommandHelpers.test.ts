import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('open command helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('opens a special file through the vscode.open command', async () => {
    const executeCommand = vi.fn(() => Promise.resolve(undefined))
    const file = vi.fn((value: string) => ({ scheme: 'file', value }))

    vi.doMock('vscode', () => ({
      commands: {
        executeCommand,
      },
      Uri: {
        file,
      },
    }))

    const { openSpecialFile } = await import('../src/openSpecialFile')

    await openSpecialFile('/tmp/demo.png')

    expect(file).toHaveBeenCalledWith('/tmp/demo.png')
    expect(executeCommand).toHaveBeenCalledWith('vscode.open', { scheme: 'file', value: '/tmp/demo.png' })
  })

  it('opens an external url through vscode env', async () => {
    const parse = vi.fn((value: string) => ({ scheme: 'https', value }))
    const openExternal = vi.fn(() => Promise.resolve(true))

    vi.doMock('vscode', () => ({
      env: {
        openExternal,
      },
      Uri: {
        parse,
      },
    }))

    const { openExternalUrl } = await import('../src/openExternalUrl')

    await expect(openExternalUrl('https://example.com')).resolves.toBe(true)
    expect(parse).toHaveBeenCalledWith('https://example.com')
    expect(openExternal).toHaveBeenCalledWith({ scheme: 'https', value: 'https://example.com' })
  })

  it('reloads the current window through the workbench command', async () => {
    const executeCommand = vi.fn(() => Promise.resolve())

    vi.doMock('vscode', () => ({
      commands: {
        executeCommand,
      },
    }))

    const { reloadWindow } = await import('../src/reloadWindow')

    await reloadWindow()

    expect(executeCommand).toHaveBeenCalledWith('workbench.action.reloadWindow')
  })

  it('opens a text document and shows it in the editor', async () => {
    const document = { uri: '/tmp/demo.ts' }
    const editor = { document }
    const openTextDocument = vi.fn(() => Promise.resolve(document))
    const showTextDocument = vi.fn(() => Promise.resolve(editor))

    vi.doMock('vscode', () => ({
      workspace: {
        openTextDocument,
      },
      window: {
        showTextDocument,
      },
    }))

    const { openFile } = await import('../src/openFile')

    await expect(openFile('/tmp/demo.ts', { preview: false })).resolves.toBe(editor)
    expect(openTextDocument).toHaveBeenCalledWith('/tmp/demo.ts')
    expect(showTextDocument).toHaveBeenCalledWith(document, { preview: false })
  })
})
