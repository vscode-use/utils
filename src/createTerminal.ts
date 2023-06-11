import * as vscode from 'vscode'

export function createTerminal(name: string) {
  return vscode.window.createTerminal(name)
}
