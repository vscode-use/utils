import * as vscode from 'vscode'
import type { Uri } from 'vscode'

/**
 * 重命名文件
 * @param oldUri 原始文件路径
 * @param newUri  新的文件路径
 * @returns Promise<void>
 */
export function rename(oldUri: Uri, newUri: Uri) {
  return vscode.workspace.fs.rename(oldUri, newUri)
}
