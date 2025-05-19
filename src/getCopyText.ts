import * as vscode from 'vscode'

/**
 * 获取剪贴板内容
 * @returns Thenable<string>
 */
export function getCopyText() {
  return vscode.env.clipboard.readText()
}
