import * as vscode from 'vscode'
import type { MessageOption } from './types'

export function message<T extends string>(options: MessageOption<T>) {
  const { type, message, buttons = [] } = options

  return type === 'info'
    ? vscode.window.showInformationMessage(message, ...buttons)
    : vscode.window.showErrorMessage(message, ...buttons)
}
