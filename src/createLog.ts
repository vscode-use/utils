import { createOutputChannel } from './createOutputChannel'

export function createLog(name: string) {
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
      outputChannel.appendLine(`[INFO] ${message}`)
    },
    warn: (message: string) => {
      outputChannel.appendLine(`[WARN] ${message}`)
    },
    error: (message: string) => {
      outputChannel.appendLine(`[ERROR] ${message}`)
    },
    debug: (message: string) => {
      outputChannel.appendLine(`[DEBUG] ${message}`)
    },
  }
}
