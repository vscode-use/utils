import * as vscode from 'vscode'

/**
 * 获取当前 vscode 的语言环境
 * @returns string
 */
export function getLocale(): string {
  return vscode.env.language
}
