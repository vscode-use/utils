import * as vscode from 'vscode'

/**
 * 打开特殊文件
 * @description openFile 只能打开纯文本文件,如果是图片、音频、视频等文件,可以使用 openPureFile
 * @param fileUri 文件路径
 * @returns Thenable<unknown>
 */
export function openSpecialFile(fileUri: string): Thenable<unknown> {
  return vscode.commands.executeCommand('vscode.open', vscode.Uri.file(fileUri))
}
