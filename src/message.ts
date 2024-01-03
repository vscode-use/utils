import * as vscode from 'vscode'
import type { MessageOption } from './types'

/**
 * 消息弹窗
 * @param options {
 *  message: string
 *  type?: 'info' | 'error' | 'warn'
 *  buttons?: string[] | string
 *  modal?: boolean
 *  detail?: string
 *  }
 * @returns
 */
export function message(options: MessageOption | string) {
  let type = 'info'
  let message = ''
  let buttons: string[] = []
  const messageOptions: any = {}
  if (typeof options === 'string') {
    message = options
  }
  else {
    const {
      type: _type = 'info',
      message: _message,
      buttons: _buttons = [],
      modal = false,
      detail,
    } = options
    type = _type
    message = _message
    buttons = Array.isArray(_buttons) ? _buttons : [_buttons]
    messageOptions.modal = modal
    messageOptions.detail = detail
  }

  return type === 'info'
    ? vscode.window.showInformationMessage(message, messageOptions, ...buttons)
    : type === 'error'
      ? vscode.window.showErrorMessage(message, messageOptions, ...buttons)
      : vscode.window.showWarningMessage(message, messageOptions, ...buttons)
}

message.info = function (
  options: string | { message: string; buttons: string[] | string; modal?: boolean; detail?: string },
) {
  let message = ''
  let buttons: string[] = []
  const messageOptions: any = {}
  if (typeof options === 'string') {
    message = options
  }
  else {
    const { message: _message, buttons: _buttons = [], modal, detail } = options
    message = _message
    buttons = Array.isArray(_buttons) ? _buttons : [_buttons]
    messageOptions.modal = modal
    messageOptions.detail = detail
  }
  return vscode.window.showInformationMessage(message, messageOptions, ...buttons)
}

message.error = function (
  options: string | { message: string; buttons: string[] | string; modal?: boolean; detail?: string },
) {
  let message = ''
  let buttons: string[] = []
  const messageOptions: any = {}

  if (typeof options === 'string') {
    message = options
  }
  else {
    const { message: _message, buttons: _buttons = [], modal, detail } = options
    message = _message
    buttons = Array.isArray(_buttons) ? _buttons : [_buttons]
    messageOptions.modal = modal
    messageOptions.detail = detail
  }
  return vscode.window.showErrorMessage(message, messageOptions, ...buttons)
}

message.warn = function (
  options: string | { message: string; buttons: string[] | string; modal?: boolean; detail?: string },
) {
  let message = ''
  let buttons: string[] = []
  const messageOptions: any = {}

  if (typeof options === 'string') {
    message = options
  }
  else {
    const { message: _message, buttons: _buttons = [], modal, detail } = options
    message = _message
    buttons = Array.isArray(_buttons) ? _buttons : [_buttons]
    messageOptions.modal = modal
    messageOptions.detail = detail
  }
  return vscode.window.showWarningMessage(message, messageOptions, ...buttons)
}
