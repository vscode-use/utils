import type { Disposable, GlobPattern } from 'vscode'
import type { WatchFilesOptions } from './types'
import * as vscode from 'vscode'
import { watchFile } from './watchFile'

/**
 * 监听多个文件变化
 * @param globPatterns 过滤规则数组
 * @param options 参数 可监听文件的变化、删除等
 * @returns Disposable
 */
export function watchFiles(globPatterns: GlobPattern[], options: WatchFilesOptions): Disposable {
  const { onCreate, onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents } = options
  const disposals = globPatterns.map(globPattern => watchFile(globPattern, { onCreate, onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents }))

  return new vscode.Disposable(() => {
    disposals.forEach(disposal => disposal.dispose())
  })
}
