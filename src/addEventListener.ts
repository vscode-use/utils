import * as vscode from 'vscode'
import type { EventCallbackMap, WorkspaceCallbackMap } from './types'

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
 * - folder-change: 文件夹变化
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
  'folder-change': 'onDidChangeWorkspaceFolders',
  'file-create': 'onDidCreateFiles',
  'file-delete': 'onDidDeleteFiles',
  'rename': 'onDidRenameFiles',
  'config-change': 'onDidChangeConfiguration',
  'text-close': 'onDidCloseTextDocument',
}
export const authenticationMap = {
  'auth-change': 'onDidChangeSessions',
}

export function addEventListener<T extends (keyof typeof eventMap | keyof typeof workspaceMap | keyof typeof authenticationMap)>(
  type: T,
  callback: T extends keyof EventCallbackMap
    ? EventCallbackMap[T]
    : T extends keyof WorkspaceCallbackMap
      ? WorkspaceCallbackMap[T]
      : T extends keyof typeof authenticationMap
        ? (providerId: string, getSession: (name: string) => Promise<vscode.AuthenticationSession | undefined>) => void
        : never,
): Disposable | undefined {
  if (type in eventMap) {
    const name = eventMap[type as keyof typeof eventMap]
    return (vscode.window as any)[name]?.(callback)
  }
  else if (type in workspaceMap) {
    const name = workspaceMap[type as keyof typeof workspaceMap]
    return (vscode.workspace as any)[name]?.(callback)
  }
  else if (type in authenticationMap) {
    const name = authenticationMap[type as keyof typeof authenticationMap]
    return (vscode.authentication as any)[name]?.((e: any) => {
      const getSession = async (name: string) => await vscode.authentication.getSession(name, ['user:read'])
      return callback(e.provider.id, getSession)
    })
  }
}
