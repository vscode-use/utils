import * as vscode from 'vscode'

/**
 * 打开外部的一个地址
 * @param uri 链接
 * @returns Thenable<boolean>
 */
export function openExternalUrl(uri: string): Thenable<boolean> {
  return vscode.env.openExternal(vscode.Uri.parse(uri))
}
