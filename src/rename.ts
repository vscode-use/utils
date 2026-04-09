import type { Uri } from 'vscode'
import * as vscode from 'vscode'

export interface RenameOptions {
  overwrite?: boolean
}

/**
 * 重命名文件
 * @param oldUri 原始文件路径
 * @param newUri 新的文件路径
 * @param options RenameOptions
 * @param options.overwrite 是否覆盖
 * @returns Thenable<void>
 */
export function rename(oldUri: Uri, newUri: Uri, options?: RenameOptions): Thenable<void> {
  return vscode.workspace.fs.rename(oldUri, newUri, options)
}
