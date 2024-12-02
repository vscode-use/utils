import { createOutputChannel } from './createOutputChannel'

/**
 * 创建一个日志记录器
 * @param {string} name - 日志记录器的名称
 * @param {object} options - 日志选项
 * @param {string} options.warn - 警告日志的前缀
 * @param {string} options.info - 信息日志的前缀
 * @param {string} options.error - 错误日志的前缀
 * @param {string} options.debug - 调试日志的前缀
 * @param {string} [options.languageId] - 语言ID（可选）
 * @returns {object} 日志记录器对象
 */
export function createLog(name: string, options: {
  warn: string
  info: string
  error: string
  debug: string
  languageId?: string
} = {
  warn: '🟡',
  info: '🔵',
  error: '🔴',
  debug: '🟢',
}) {
  const outputChannel = createOutputChannel(name, options.languageId)
  return {
    /**
     * 显示日志输出通道
     */
    show: () => {
      outputChannel.show()
    },
    /**
     * 释放日志输出通道
     */
    dispose: () => {
      outputChannel.dispose()
    },
    /**
     * 清除日志输出通道
     */
    clear: () => {
      outputChannel.clear()
    },
    /**
     * 追加消息到日志输出通道
     * @param {string} message - 要追加的消息
     */
    append: (message: string) => {
      outputChannel.append(message)
    },
    /**
     * 追加消息并换行到日志输出通道
     * @param {string} message - 要追加的消息
     */
    appendLine: (message: string) => {
      outputChannel.appendLine(message)
    },
    /**
     * 隐藏日志输出通道
     */
    hide: () => {
      outputChannel.hide()
    },
    /**
     * 记录信息日志
     * @param {string} message - 信息消息
     */
    info: (message: string) => {
      outputChannel.appendLine(`${options.info} [INFO] ${message}`)
    },
    /**
     * 记录警告日志
     * @param {string} message - 警告消息
     */
    warn: (message: string) => {
      outputChannel.appendLine(`${options.warn} [WARN] ${message}`)
    },
    /**
     * 记录错误日志
     * @param {string} message - 错误消息
     */
    error: (message: string) => {
      outputChannel.appendLine(`${options.error} [ERROR] ${message}`)
    },
    /**
     * 记录调试日志
     * @param {string} message - 调试消息
     */
    debug: (message: string) => {
      outputChannel.appendLine(`${options.debug} [DEBUG] ${message}`)
    },
  }
}
