import * as vscode from 'vscode'

export function reloadWindow() {
  return vscode.commands.executeCommand('workbench.action.reloadWindow')
}
