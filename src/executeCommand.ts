import * as vscode from 'vscode'

/**
 * 执行命令
 * @param name
 * @param params
 * @returns Thenable<T | undefined>
 */
export function executeCommand<T = unknown>(name: string, ...params: unknown[]): Thenable<T | undefined> {
  return vscode.commands.executeCommand<T>(name, ...params)
}
