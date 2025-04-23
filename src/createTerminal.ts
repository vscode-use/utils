import * as vscode from './vscode-shim'

/**
 * @name createTerminal 创建终端
 * @param name 终端名称
 * @param options TerminalOptions | ExtensionTerminalOptions
 * @returns Terminal
 */
export function createTerminal(name: string, options?: vscode.TerminalOptions | vscode.ExtensionTerminalOptions) {
  return vscode.window.createTerminal({
    name,
    ...options,
  })
}
