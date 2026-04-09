import type { EventCallbackMap, WorkspaceCallbackMap } from './types'
import * as vscode from 'vscode'
import { addEffect } from './util'

/**
 * 添加事件监听
 * @param type 事件类型
 * @param callback 回调函数
 * @d 时,你可以取消注册
 * 事件类型:
 * - terminal-close: 终端关闭
 * - terminal-open: 终端打开
 * - terminal-change: 终端切换
 * - theme-change: 主题切换
 * - selection-change: 选择变化
 * - editor-visible: 编辑器可见
 * - activeText-change: 激活文件变化
 * - text-visible-change: 文本可见范围变化
 * - text-column-change: 文本编辑器视图列变化
 * - text-change: 文本变化
 * - text-open: 文本打开
 * - text-save: 文本保存
 * - workspace-change: 文件夹变化
 * - file-create: 文件创建
 * - file-delete: 文件删除
 * - rename: 文件重命名
 * - config-change: 配置变化
 * - text-close: 文本关闭
 * - auth-change: 认证变化
 * @returns
 */
export const eventMap = {
  'terminal-close': 'onDidCloseTerminal',
  'terminal-open': 'onDidOpenTerminal',
  'terminal-change': 'onDidChangeActiveTerminal',
  'theme-change': 'onDidChangeActiveColorTheme',
  'selection-change': 'onDidChangeTextEditorSelection',
  'editor-visible': 'onDidChangeVisibleTextEditors',
  'activeText-change': 'onDidChangeActiveTextEditor',
  'text-visible-change': 'onDidChangeTextEditorVisibleRanges',
  'text-column-change': 'onDidChangeTextEditorViewColumn',
  'onfocus': 'onDidChangeWindowState',
}
export const workspaceMap = {
  'text-change': 'onDidChangeTextDocument',
  'text-open': 'onDidOpenTextDocument',
  'text-save': 'onDidSaveTextDocument',
  'workspace-change': 'onDidChangeWorkspaceFolders',
  'file-create': 'onDidCreateFiles',
  'file-delete': 'onDidDeleteFiles',
  'rename': 'onDidRenameFiles',
  'config-change': 'onDidChangeConfiguration',
  'text-close': 'onDidCloseTextDocument',
}
export const authenticationMap = {
  'auth-change': 'onDidChangeSessions',
}

export interface GetSession {
  (scopes: readonly string[], options?: vscode.AuthenticationGetSessionOptions): Promise<vscode.AuthenticationSession | undefined>
  (providerId: string, scopes: readonly string[], options?: vscode.AuthenticationGetSessionOptions): Promise<vscode.AuthenticationSession | undefined>
}
export type AuthCallback = (providerId: string, getSession: GetSession) => void
type EventRegister<T extends (...args: never[]) => unknown> = ((listener: T, thisArgs?: unknown) => vscode.Disposable) | undefined
type AuthenticationChangeEvent = Parameters<Parameters<NonNullable<typeof vscode.authentication.onDidChangeSessions>>[0]>[0]
export type ListenerType = keyof typeof eventMap | keyof typeof workspaceMap | keyof typeof authenticationMap
export type ListenerCallback<T extends ListenerType>
  = T extends keyof typeof eventMap
    ? EventCallbackMap[T]
    : T extends keyof typeof workspaceMap
      ? WorkspaceCallbackMap[T]
      : T extends keyof typeof authenticationMap
        ? AuthCallback
        : never

const windowEventRegisters = {
  'terminal-close': vscode.window.onDidCloseTerminal,
  'terminal-open': vscode.window.onDidOpenTerminal,
  'terminal-change': vscode.window.onDidChangeActiveTerminal,
  'theme-change': vscode.window.onDidChangeActiveColorTheme,
  'selection-change': vscode.window.onDidChangeTextEditorSelection,
  'editor-visible': vscode.window.onDidChangeVisibleTextEditors,
  'activeText-change': vscode.window.onDidChangeActiveTextEditor,
  'text-visible-change': vscode.window.onDidChangeTextEditorVisibleRanges,
  'text-column-change': vscode.window.onDidChangeTextEditorViewColumn,
  'onfocus': vscode.window.onDidChangeWindowState,
} satisfies { [K in keyof typeof eventMap]: EventRegister<EventCallbackMap[K]> }

const workspaceEventRegisters = {
  'text-change': vscode.workspace.onDidChangeTextDocument,
  'text-open': vscode.workspace.onDidOpenTextDocument,
  'text-save': vscode.workspace.onDidSaveTextDocument,
  'workspace-change': vscode.workspace.onDidChangeWorkspaceFolders,
  'file-create': vscode.workspace.onDidCreateFiles,
  'file-delete': vscode.workspace.onDidDeleteFiles,
  'rename': vscode.workspace.onDidRenameFiles,
  'config-change': vscode.workspace.onDidChangeConfiguration,
  'text-close': vscode.workspace.onDidCloseTextDocument,
} satisfies { [K in keyof typeof workspaceMap]: EventRegister<WorkspaceCallbackMap[K]> }

const authenticationEventRegisters = {
  'auth-change': vscode.authentication.onDidChangeSessions,
} satisfies { [K in keyof typeof authenticationMap]: EventRegister<(event: AuthenticationChangeEvent) => void> }

export function addEventListener<T extends ListenerType>(type: T, callback: ListenerCallback<T>): vscode.Disposable {
  if (type in eventMap)
    return addWindowEventListener(type as keyof typeof eventMap, callback as EventCallbackMap[keyof typeof eventMap])
  if (type in workspaceMap)
    return addWorkspaceEventListener(type as keyof typeof workspaceMap, callback as WorkspaceCallbackMap[keyof typeof workspaceMap])
  return addAuthenticationEventListener(callback as AuthCallback)
}

function addWindowEventListener<T extends keyof typeof eventMap>(type: T, callback: EventCallbackMap[T]): vscode.Disposable {
  const disposable = new vscode.Disposable(() => { })
  const register = windowEventRegisters[type] as EventRegister<EventCallbackMap[T]>
  return addEffect(register?.(callback) ?? disposable)
}

function addWorkspaceEventListener<T extends keyof typeof workspaceMap>(type: T, callback: WorkspaceCallbackMap[T]): vscode.Disposable {
  const disposable = new vscode.Disposable(() => { })

  if (type === 'text-change') {
    return addEffect(workspaceEventRegisters['text-change']?.(({ contentChanges, document, reason }: vscode.TextDocumentChangeEvent) => {
      if (contentChanges.length === 0) {
        return
      }
      ;(callback as WorkspaceCallbackMap['text-change'])({ contentChanges, document, reason } as vscode.TextDocumentChangeEvent)
    }) ?? disposable)
  }

  const register = workspaceEventRegisters[type] as EventRegister<WorkspaceCallbackMap[T]>
  return addEffect(register?.(callback) ?? disposable)
}

function addAuthenticationEventListener(callback: AuthCallback): vscode.Disposable {
  return addEffect(authenticationEventRegisters['auth-change']?.((e: AuthenticationChangeEvent) => {
    const getSession: GetSession = async (
      providerIdOrScopes: string | readonly string[],
      scopesOrOptions?: readonly string[] | vscode.AuthenticationGetSessionOptions,
      maybeOptions?: vscode.AuthenticationGetSessionOptions,
    ) => {
      const providerId = typeof providerIdOrScopes === 'string' ? providerIdOrScopes : e.provider.id
      let scopes: readonly string[] = []
      let options: vscode.AuthenticationGetSessionOptions | undefined

      if (Array.isArray(providerIdOrScopes)) {
        scopes = providerIdOrScopes
        options = scopesOrOptions as vscode.AuthenticationGetSessionOptions | undefined
      }
      else if (Array.isArray(scopesOrOptions)) {
        scopes = scopesOrOptions
        options = maybeOptions
      }
      else {
        options = scopesOrOptions as vscode.AuthenticationGetSessionOptions | undefined
      }

      return vscode.authentication.getSession(providerId, scopes, options)
    }
    callback(e.provider.id, getSession)
  }) ?? new vscode.Disposable(() => { }))
}
