import * as vscode from 'vscode'
import type { MessageOption } from './types'
export function registerCommand(
  name: string,
  callback: (...args: any[]) => any,
) {
  return vscode.commands.registerCommand(name, callback)
}

export function getConfiguration(name: string) {
  return vscode.workspace.getConfiguration(name)
}

export function message<T extends string>(options: MessageOption<T>) {
  const { type, message, buttons = [] } = options

  return type === 'info'
    ? vscode.window.showInformationMessage(message, ...buttons)
    : vscode.window.showErrorMessage(message, ...buttons)
}

export function openFile(fileUri: string) {
  vscode.workspace
    .openTextDocument(fileUri)
    .then(doc => vscode.window.showTextDocument(doc))
}
