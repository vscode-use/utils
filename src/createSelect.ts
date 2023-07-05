import * as vscode from 'vscode'

export function createSelect(options: string[]) {
  return vscode.window.showQuickPick(options)
}
