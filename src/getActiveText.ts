import * as vscode from 'vscode'
export function getActiveText() {
  return vscode.window.activeTextEditor?.document.getText()
}
