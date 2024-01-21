import * as vscode from 'vscode'

/**
 * 创建样式
 * @param options
 * @returns
 */
export function createCodeLens(range: vscode.Range, command?: vscode.Command) {
  return new vscode.CodeLens(range, command)
}
