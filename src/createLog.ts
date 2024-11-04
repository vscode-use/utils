import { createOutputChannel } from './createOutputChannel'

/**
 * 创建一个日志记录器。
 *
 * @param name - 日志记录器的名称。
 * @param options - 日志记录器的选项，包含不同级别日志的图标。默认值为：
 * {
 *   warn: '🟡',
 *   info: '🔵',
 *   error: '🔴',
 *   debug: '🟢',
 * }
 * @returns 一个包含多种日志操作的对象。
 *
 * @example
 * const log = createLog('MyLog');
 * log.info('这是一个信息日志');
 * log.warn('这是一个警告日志');
 * log.error('这是一个错误日志');
 * log.debug('这是一个调试日志');
 */
export function createLog(name: string, options = {
  warn: '🟡',
  info: '🔵',
  error: '🔴',
  debug: '🟢',
}) {
  const outputChannel = createOutputChannel(name)
  return {
    show: () => {
      outputChannel.show()
    },
    dispose: () => {
      outputChannel.dispose()
    },
    clear: () => {
      outputChannel.clear()
    },
    append: (message: string) => {
      outputChannel.append(message)
    },
    appendLine: (message: string) => {
      outputChannel.appendLine(message)
    },
    hide: () => {
      outputChannel.hide()
    },
    info: (message: string) => {
      outputChannel.appendLine(`${options.info} [INFO] ${message}`)
    },
    warn: (message: string) => {
      outputChannel.appendLine(`${options.warn} [WARN] ${message}`)
    },
    error: (message: string) => {
      outputChannel.appendLine(`${options.error} [ERROR] ${message}`)
    },
    debug: (message: string) => {
      outputChannel.appendLine(`${options.debug} [DEBUG] ${message}`)
    },
  }
}
