import * as vscode from 'vscode'

export function executeCommand(name: string, ...params: any[]) {
  return vscode.commands.executeCommand(name, ...params)
}
