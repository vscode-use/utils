import * as vscode from 'vscode'
/**
 * 根据offset获取行列
 */
export function getPosition(offset: number) {
  const document = vscode.window.activeTextEditor!.document
  const position = document.positionAt(offset)
  const line = position.line
  const column = position.character + 1
  return {
    line,
    column,
    character: column,
  }
}
