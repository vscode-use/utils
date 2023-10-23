import * as vscode from 'vscode'
import type { CreateInputOptions } from './types'

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
