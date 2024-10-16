import * as vscode from 'vscode'

export function reloadWindow() {
  vscode.commands.executeCommand('workbench.action.reloadWindow')
}
