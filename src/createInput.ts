import type { CreateInputOptions } from './types'
import * as vscode from './vscode-shim'

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
 * @param options.ignoreFocusOut boolean 是否忽略焦点
 * @param options.password boolean 是否是密码输入框
 * @param options.prompt string 提示
 * @param options.title string 标题
 * @param options.value string 默认值
 * @param options.selection [number, number] 默认选中范围
 * @param options.placeHolder string 占位符
 * @param options.validate (value: string) => string | InputBoxValidationMessage | undefined | null | Thenable<string | InputBoxValidationMessage | undefined | null> 验证函数
 * @returns Thenable<string | undefined>
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
