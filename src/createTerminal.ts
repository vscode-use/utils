import * as vscode from 'vscode'

export type CreateTerminalOptions = vscode.TerminalOptions | vscode.ExtensionTerminalOptions

/**
 * @name createTerminal 创建终端
 * @param name 终端名称
 * @param options CreateTerminalOptions
 * @returns Terminal
 */
export function createTerminal(
  name: string,
  options?: CreateTerminalOptions,
): vscode.Terminal {
  return vscode.window.createTerminal({
    name,
    ...options,
  })
}
