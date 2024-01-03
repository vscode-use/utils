import * as vscode from 'vscode'
import type { CreateInputOptions } from './types'

/**
 * 创建输入框
 * @param options {
  ignoreFocusOut?: boolean
  password?: boolean
  prompt?: string
  title?: string
  value: string
  selection?: [number, number]
  placeHolder?: string
  validate?: (value: string) => string | InputBoxValidationMessage | undefined | null |
  Thenable<string | InputBoxValidationMessage | undefined | null>
}
 * @returns
 */
export function createInput(options: CreateInputOptions) {
  return vscode.window.showInputBox({
    prompt: options.prompt,
    password: options.password,
    title: options.title,
    value: options.value,
    valueSelection: options.selection,
    placeHolder: options.placeHolder,
    validateInput: options.validate,
    ignoreFocusOut: options.ignoreFocusOut ?? true,
  })
}
