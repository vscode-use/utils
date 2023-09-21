import { workspace } from 'vscode'
import type { GlobPattern } from 'vscode'
import type { WatchFilesOptions } from './types'

export function watchFiles(globPattern: GlobPattern, options: WatchFilesOptions) {
  const { onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents } = options
  const watcher = workspace.createFileSystemWatcher(globPattern, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents)

  if (onChange)
    watcher.onDidChange(onChange)
  if (onDelete)
    watcher.onDidDelete(onDelete)

  return () => watcher.dispose()
}
