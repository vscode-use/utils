import * as vscode from './vscode-shim'

/**
 * 打开外部的一个地址
 * @param uri 链接
 * @returns Thenable<void>
 */
export function openExternalUrl(uri: string) {
  return vscode.env.openExternal(vscode.Uri.parse(uri))
}
