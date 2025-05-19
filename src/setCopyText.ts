import * as vscode from 'vscode'

/**
 * 设置剪贴板内容
 * @param text 内容
 * @returns Promise<void>
 */
export function setCopyText(text: string) {
  return vscode.env.clipboard.writeText(text)
}
