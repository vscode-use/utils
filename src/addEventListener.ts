import * as vscode from 'vscode'
import type { EventType } from './types'

/**
 * 添加事件监听
 * @param type 事件类型
 * @param callback 回调函数
 * @returns
 */
export function addEventListener(
  type: EventType,
  callback: (...args: any) => void,
) {
  const eventMap: any = {
    'terminal-close': 'onDidCloseTerminal',
    'terminal-open': 'onDidOpenTerminal',
    'terminal-change': 'onDidChangeActiveTerminal',
    'theme-change': 'onDidChangeActiveColorTheme',
    'selection-change': 'onDidChangeTextEditorSelection',
    'editor-visible': 'onDidChangeVisibleTextEditors',
    'activeText-change': 'onDidChangeActiveTextEditor',
    'text-visible-change': 'onDidChangeTextEditorVisibleRanges',
    'text-column-change': 'onDidChangeTextEditorViewColumn',
  }
  const workspaceMap: any = {
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
  const authenticationMap: any = {
    'auth-change': 'onDidChangeSessions',
  }

  if (type in eventMap) {
    const name = eventMap[type]
    return (vscode.window as any)[name]?.(callback)
  }
  else if (type in workspaceMap) {
    const name = workspaceMap[type]
    return (vscode.workspace as any)[name]?.(callback)
  }
  else if (type in authenticationMap) {
    const name = authenticationMap[type]
    return (vscode.authentication as any)[name]?.((e: any) => {
      const getSession = async (name: string) => await vscode.authentication.getSession(name, ['user:read'])
      return callback(e.provider.id, getSession)
    })
  }
}
