import type { WatchFilesOptions } from './types'
import type { GlobPattern } from './vscode-shim'
import { addEffect } from './util'
import { workspace } from './vscode-shim'

/**
 * 监听文件变化
 * @param globPattern 过滤规则
 * @param options 参数 可监听文件的变化、删除等
 * @returns 取消监听的函数
 */
export function watchFile(globPattern: GlobPattern, options: WatchFilesOptions) {
  const { onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents } = options
  const watcher = workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents)

  if (onChange)
    watcher.onDidChange(onChange)
  if (onDelete)
    watcher.onDidDelete(onDelete)

  addEffect(watcher)

  return () => watcher.dispose()
}
