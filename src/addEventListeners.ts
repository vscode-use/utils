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

type EventListenerTuple = {
  [K in keyof typeof eventMap]: [K, EventCallbackMap[K]]
}[keyof typeof eventMap]

type WorkspaceListenerTuple = {
  [K in keyof typeof workspaceMap]: [K, WorkspaceCallbackMap[K]]
}[keyof typeof workspaceMap]

type AuthListenerTuple = {
  [K in keyof typeof authenticationMap]: [K, (providerId: string, getSession: (name: string) => Promise<vscode.AuthenticationSession | undefined>) => void]
}[keyof typeof authenticationMap]

type ListenerTuple = EventListenerTuple | WorkspaceListenerTuple | AuthListenerTuple

export function addEventListeners(options: ListenerTuple[]) {
  return options.map(([type, callback]) => addEventListener(type as any, callback as any))
}
