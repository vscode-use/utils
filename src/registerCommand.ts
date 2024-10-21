import * as vscode from 'vscode'
import { addEffect } from './util'

/**
 * 注册指令
 * @param name 指令名
 * @param callback 回调函数
 * @returns Disposable
 */
export function registerCommand(
  name: string,
  callback: (...args: any[]) => any,
) {
  return addEffect(vscode.commands.registerCommand(name, callback))
}
