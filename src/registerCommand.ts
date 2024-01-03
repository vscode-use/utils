import * as vscode from 'vscode'

/**
 * 注册指令
 * @param name 指令名
 * @param callback 回调函数
 * @returns
 */
export function registerCommand(
  name: string,
  callback: (...args: any[]) => any,
) {
  return vscode.commands.registerCommand(name, callback)
}
