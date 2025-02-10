import type { GlobPattern } from 'vscode'
import type { WatchFilesOptions } from './types'
import { watchFile } from './watchFile'

/**
 * 监听多个文件变化
 * @param globPatterns 过滤规则数组
 * @param options 参数 可监听文件的变化、删除等
 * @returns 取消监听的函数
 */
export function watchFiles(globPatterns: GlobPattern[], options: WatchFilesOptions) {
  const { onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents } = options
  const disposals = globPatterns.map(globPattern => watchFile(globPattern, { onChange, onDelete, ignoreCreateEvents, ignoreChangeEvents, ignoreDeleteEvents }))

  return () => disposals.forEach(disposal => disposal())
}
