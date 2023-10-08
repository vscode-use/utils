import * as vscode from 'vscode'
export function getLineText(lineNumber: number) {
  return vscode.window.activeTextEditor!.document.lineAt(lineNumber).text
}
