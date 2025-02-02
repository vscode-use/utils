import type * as vscode from 'vscode'
import type { authenticationMap, eventMap, workspaceMap } from './addEventListener'
import type { EventCallbackMap, WorkspaceCallbackMap } from './types'
import { addEventListener } from './addEventListener'

/**
 * 添加多个事件监听
 * @param options Array<[T,
    T extends keyof EventCallbackMap
    ? EventCallbackMap[T]
    : T extends keyof WorkspaceCallbackMap
    ? WorkspaceCallbackMap[T]
    : T extends keyof typeof authenticationMap
    ? (providerId: string, getSession: (name: string) => Promise<vscode.AuthenticationSession | undefined>) => void
    : never,]>
 * @returns
 */

export function addEventListeners<T extends (keyof typeof eventMap | keyof typeof workspaceMap | keyof typeof authenticationMap)>(
  options: Array<[T, T extends keyof EventCallbackMap
    ? EventCallbackMap[T]
    : T extends keyof WorkspaceCallbackMap
      ? WorkspaceCallbackMap[T]
      : T extends keyof typeof authenticationMap
        ? (providerId: string, getSession: (name: string) => Promise<vscode.AuthenticationSession | undefined>) => void
        : never]>,
) {
  return options.map(([type, callback]) => addEventListener<T>(type, callback))
}
