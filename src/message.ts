import type { MessageInput, MessageOption } from './types'
import * as vscode from 'vscode'

/**
 * 消息弹窗
 * @param options {
 *  message: string
 *  type?: 'info' | 'error' | 'warn'
 *  buttons?: string[] | string
 *  modal?: boolean
 *  detail?: string
 *  }
 * @returns Thenable<string | undefined>
 */
export interface MessageHandler {
  <T extends string = string>(options: MessageOption<T> | string): Thenable<T | undefined>
  info: <T extends string = string>(options: MessageInput<T>) => Thenable<T | undefined>
  error: <T extends string = string>(options: MessageInput<T>) => Thenable<T | undefined>
  warn: <T extends string = string>(options: MessageInput<T>) => Thenable<T | undefined>
}

export const message = (<T extends string = string>(options: MessageOption<T> | string) => {
  const normalized = normalizeMessageOptions(options)
  return showMessage(normalized.type, normalized.message, normalized.messageOptions, normalized.buttons)
}) as MessageHandler

message.info = function <T extends string = string>(options: MessageInput<T>) {
  const normalized = normalizeMessageOptions(options, 'info')
  return showMessage('info', normalized.message, normalized.messageOptions, normalized.buttons)
}

message.error = function <T extends string = string>(options: MessageInput<T>) {
  const normalized = normalizeMessageOptions(options, 'error')
  return showMessage('error', normalized.message, normalized.messageOptions, normalized.buttons)
}

message.warn = function <T extends string = string>(options: MessageInput<T>) {
  const normalized = normalizeMessageOptions(options, 'warn')
  return showMessage('warn', normalized.message, normalized.messageOptions, normalized.buttons)
}

function normalizeMessageOptions<T extends string>(
  options: MessageOption<T> | MessageInput<T>,
  fallbackType: 'info' | 'error' | 'warn' = 'info',
) {
  if (typeof options === 'string') {
    return {
      type: fallbackType,
      message: options,
      buttons: [] as T[],
      messageOptions: {} as vscode.MessageOptions,
    }
  }

  const type = 'type' in options ? options.type ?? fallbackType : fallbackType
  const {
    message,
    buttons = [],
  } = options
  const messageOptions: vscode.MessageOptions = {
    modal: options.modal,
    detail: options.detail,
  }

  return {
    type,
    message,
    buttons: Array.isArray(buttons) ? [...buttons] : [buttons],
    messageOptions,
  }
}

function showMessage<T extends string>(
  type: 'info' | 'error' | 'warn',
  text: string,
  options: vscode.MessageOptions,
  buttons: readonly T[],
) {
  switch (type) {
    case 'error':
      return vscode.window.showErrorMessage(text, options, ...buttons)
    case 'warn':
      return vscode.window.showWarningMessage(text, options, ...buttons)
    default:
      return vscode.window.showInformationMessage(text, options, ...buttons)
  }
}
