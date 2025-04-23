import * as vscode from './vscode-shim'

/**
 * 创建一个代码镜头
 * @param range Range 代码镜头的范围
 * @param command Command 代码镜头的指令
 * @returns TextEditorDecorationType
 */
export function createCodeLens(range: vscode.Range, command?: vscode.Command) {
  return new vscode.CodeLens(range, command)
}
