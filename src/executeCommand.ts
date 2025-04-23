import * as vscode from './vscode-shim'

/**
 * 执行命令
 * @param name
 * @param params
 * @returns Thenable<any>
 */
export function executeCommand(name: string, ...params: any[]) {
  return vscode.commands.executeCommand<any>(name, ...params)
}
