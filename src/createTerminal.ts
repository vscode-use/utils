import * as vscode from 'vscode'

/**
 * 创建终端
 * @param name
 * @returns
 */
export function createTerminal(name: string) {
  return vscode.window.createTerminal(name)
}
