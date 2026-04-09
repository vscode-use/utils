import type { FileSystemWatcher, GlobPattern } from 'vscode'
import type { WatchFilesOptions } from './types'
import { workspace } from 'vscode'
import { addEffect } from './util'

/**
 * 监听文件变化
 * @param globPattern 过滤规则
 * @param options 参数 可监听文件的变化、删除等
 * @returns FileSystemWatcher
 */
export function watchFile(globPattern: GlobPattern, options: WatchFilesOptions): FileSystemWatcher {
  const { onCreate, onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents } = options
  const watcher = workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents)

  if (onCreate)
    watcher.onDidCreate(onCreate)
  if (onChange)
    watcher.onDidChange(onChange)
  if (onDelete)
    watcher.onDidDelete(onDelete)

  return addEffect(watcher)
}
