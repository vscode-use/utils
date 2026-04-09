import * as vscode from 'vscode'

export function reloadWindow(): Thenable<void> {
  return vscode.commands.executeCommand<void>('workbench.action.reloadWindow')
}
