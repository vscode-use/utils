import * as vscode from 'vscode'

export function nextTick(): Promise<void>
/**
 * 当进去文件更新（增删改查等）时，需要等到文件变化后执行函数
 * @param fn 更新后待执行的函数
 * @returns Thenable<void>
 */
export function nextTick<T>(fn: (result: boolean) => T | PromiseLike<T>): Promise<T>
export function nextTick<T>(fn?: (result: boolean) => T | PromiseLike<T>): Promise<T | void> {
  return new Promise((resolve) => {
    vscode.workspace.applyEdit(new vscode.WorkspaceEdit()).then((result) => {
      resolve(fn?.(result))
    })
  })
}
