import * as vscode from 'vscode'

/**
 * 设置剪贴板内容
 * @param text 内容
 * @returns Thenable<void>
 */
export function setCopyText(text: string): Thenable<void> {
  return vscode.env.clipboard.writeText(text)
}
