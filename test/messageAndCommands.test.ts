import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('message and command helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('routes message calls to the matching vscode window API', async () => {
    const showInformationMessage = vi.fn()
    const showWarningMessage = vi.fn()
    const showErrorMessage = vi.fn()

    vi.doMock('vscode', () => ({
      window: {
        showInformationMessage,
        showWarningMessage,
        showErrorMessage,
      },
    }))

    const { message } = await import('../src/message')

    message({
      type: 'info',
      message: 'hello',
      buttons: ['ok', 'cancel'] as const,
      modal: true,
      detail: 'detail',
    })
    message.warn({
      message: 'warn',
      buttons: 'retry',
    })
    message.error('boom')

    expect(showInformationMessage).toHaveBeenCalledWith('hello', { modal: true, detail: 'detail' }, 'ok', 'cancel')
    expect(showWarningMessage).toHaveBeenCalledWith('warn', {}, 'retry')
    expect(showErrorMessage).toHaveBeenCalledWith('boom', {})
  })

  it('passes commands and parameters through to vscode.commands.executeCommand', async () => {
    const executeCommandMock = vi.fn()

    vi.doMock('vscode', () => ({
      commands: {
        executeCommand: executeCommandMock,
      },
    }))

    const { executeCommand } = await import('../src/executeCommand')
    const { executeCommands } = await import('../src/executeCommands')

    executeCommand('one', 1, 'two')
    executeCommands([
      ['two', true],
      ['three'],
    ])

    expect(executeCommandMock).toHaveBeenNthCalledWith(1, 'one', 1, 'two')
    expect(executeCommandMock).toHaveBeenNthCalledWith(2, 'two', true)
    expect(executeCommandMock).toHaveBeenNthCalledWith(3, 'three')
  })

  it('passes configuration updates through to workspace configuration', async () => {
    const update = vi.fn()
    const getConfiguration = vi.fn(() => ({
      update,
    }))

    vi.doMock('vscode', () => ({
      workspace: {
        getConfiguration,
      },
    }))

    const { setConfiguration } = await import('../src/setConfiguration')

    setConfiguration('theme.mode', 'dark', true, false)

    expect(getConfiguration).toHaveBeenCalledWith()
    expect(update).toHaveBeenCalledWith('theme.mode', 'dark', true, false)
  })
})
