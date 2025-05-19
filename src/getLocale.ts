import * as vscode from 'vscode'

/**
 * 获取当前 vscode 的语言环境
 * @returns vscode.env.language
 */
export function getLocale() {
  return vscode.env.language
}
