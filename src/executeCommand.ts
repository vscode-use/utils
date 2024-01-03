import * as vscode from 'vscode'

/**
 * 执行命令
 * @param name
 * @param params
 * @returns
 */
export function executeCommand(name: string, ...params: any[]) {
  return vscode.commands.executeCommand(name, ...params)
}
