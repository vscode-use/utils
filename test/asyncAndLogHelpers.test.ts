import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('async and log helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('resolves nextTick with the callback result after applyEdit completes', async () => {
    const applyEdit = vi.fn(() => Promise.resolve(true))
    const WorkspaceEdit = vi.fn()

    vi.doMock('vscode', () => ({
      workspace: {
        applyEdit,
      },
      WorkspaceEdit,
    }))

    const { nextTick } = await import('../src/nextTick')

    await expect(nextTick(result => result ? 'done' : 'failed')).resolves.toBe('done')
    expect(WorkspaceEdit).toHaveBeenCalledTimes(1)
    expect(applyEdit).toHaveBeenCalledWith(expect.any(WorkspaceEdit))
  })

  it('routes logger methods through the output channel', async () => {
    const outputChannel = {
      show: vi.fn(),
      dispose: vi.fn(),
      clear: vi.fn(),
      append: vi.fn(),
      appendLine: vi.fn(),
      hide: vi.fn(),
    }
    const createOutputChannel = vi.fn(() => outputChannel)

    vi.doMock('../src/createOutputChannel', () => ({
      createOutputChannel,
    }))

    const { createLog } = await import('../src/createLog')
    const logger = createLog('utils', {
      warn: 'W',
      info: 'I',
      error: 'E',
      debug: 'D',
      languageId: 'log',
    })

    logger.show()
    logger.clear()
    logger.append('plain')
    logger.appendLine('line')
    logger.hide()
    logger.info('hello')
    logger.warn('careful')
    logger.error('boom')
    logger.debug('trace')
    logger.dispose()

    expect(createOutputChannel).toHaveBeenCalledWith('utils', 'log')
    expect(outputChannel.show).toHaveBeenCalledTimes(1)
    expect(outputChannel.clear).toHaveBeenCalledTimes(1)
    expect(outputChannel.append).toHaveBeenCalledWith('plain')
    expect(outputChannel.appendLine).toHaveBeenNthCalledWith(1, 'line')
    expect(outputChannel.appendLine).toHaveBeenNthCalledWith(2, 'I [INFO] hello')
    expect(outputChannel.appendLine).toHaveBeenNthCalledWith(3, 'W [WARN] careful')
    expect(outputChannel.appendLine).toHaveBeenNthCalledWith(4, 'E [ERROR] boom')
    expect(outputChannel.appendLine).toHaveBeenNthCalledWith(5, 'D [DEBUG] trace')
    expect(outputChannel.hide).toHaveBeenCalledTimes(1)
    expect(outputChannel.dispose).toHaveBeenCalledTimes(1)
  })
})
