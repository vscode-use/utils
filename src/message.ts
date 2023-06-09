import * as vscode from 'vscode'
import type { MessageOption } from './types'

export function message<T extends string>(options: MessageOption<T> | string) {
  let type = 'info'
  let message = ''
  let buttons: string[] = []
  if (typeof options === 'string') { message = options }
  else {
    const { type: _type, message: _message, buttons: _buttons = [] } = options
    type = _type
    message = _message
    buttons = _buttons
  }

  return type === 'info'
    ? vscode.window.showInformationMessage(message, ...buttons)
    : vscode.window.showErrorMessage(message, ...buttons)
}

message.prototype.info = function (options: string | { message: string; buttons: string[] }) {
  let message = ''
  let buttons: string[] = []
  if (typeof options === 'string') { message = options }
  else {
    const { message: _message, buttons: _buttons = [] } = options
    message = _message
    buttons = _buttons
  }
  return vscode.window.showInformationMessage(message, ...buttons)
}

message.prototype.error = function (options: string | { message: string; buttons: string[] }) {
  let message = ''
  let buttons: string[] = []
  if (typeof options === 'string') { message = options }
  else {
    const { message: _message, buttons: _buttons = [] } = options
    message = _message
    buttons = _buttons
  }
  return vscode.window.showErrorMessage(message, ...buttons)
}
