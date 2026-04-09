import * as vscode from 'vscode'

/**
 * 创建一个代码镜头
 * @param range Range 代码镜头的范围
 * @param command Command 代码镜头的指令
 * @returns CodeLens
 */
export function createCodeLens(range: vscode.Range, command?: vscode.Command): vscode.CodeLens {
  return new vscode.CodeLens(range, command)
}
