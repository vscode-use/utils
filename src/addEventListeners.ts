import type * as vscode from 'vscode'
import type { ListenerCallback, ListenerType } from './addEventListener'
import { addEventListener } from './addEventListener'

/**
 * 添加多个事件监听
 * @param options Array<[type, callback]>
 * @returns
 */
export type ListenerTuple<T extends ListenerType = ListenerType> = readonly [T, ListenerCallback<T>]

export function addEventListeners<const T extends readonly ListenerTuple[]>(options: T): vscode.Disposable[] {
  return options.map(option => addSingleEventListener(option))
}

function addSingleEventListener<T extends ListenerType>(option: ListenerTuple<T>): vscode.Disposable {
  return addEventListener(option[0], option[1])
}
