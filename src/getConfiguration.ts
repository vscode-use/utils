import * as vscode from 'vscode'

export function getConfiguration(name: string) {
  return vscode.workspace.getConfiguration(name)
}
