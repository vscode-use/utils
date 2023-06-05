import * as vscode from 'vscode'

export function registerCommand(
  name: string,
  callback: (...args: any[]) => any,
) {
  return vscode.commands.registerCommand(name, callback)
}
