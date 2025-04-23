import * as vscode from './vscode-shim'

export function reloadWindow() {
  return vscode.commands.executeCommand('workbench.action.reloadWindow')
}
