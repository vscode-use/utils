import type { Uri } from 'vscode'
import * as vscode from 'vscode'

/**
 * 重命名文件
 * @param oldUri 原始文件路径
 * @param newUri 新的文件路径
 * @param options { overwrite?: boolean }
 * @param options.overwrite 是否覆盖
 * @returns Promise<void>
 */
export function rename(oldUri: Uri, newUri: Uri, options?: { overwrite?: boolean }) {
  return vscode.workspace.fs.rename(oldUri, newUri, options)
}
