import * as vscode from 'vscode'
import type { EventType } from './types'

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
  }
  const workspaceMap: any = {
    'text-change': 'onDidChangeTextDocument',
    'text-open': 'onDidOpenTextDocument',
    'text-save': 'onDidSaveTextDocument',
    'folder-change': 'onDidChangeWorkspaceFolders',
    'file-create': 'onDidCreateFiles',
    'file-delete': 'onDidDeleteFiles',
    'rename': 'onDidRenameFiles',
  }
  if (type in eventMap) {
    const name = eventMap[type]
    return (vscode.window as any)[name]?.(callback)
  }
  else if (type in workspaceMap) {
    const name = workspaceMap[type]
    return (vscode.workspace as any)[name]?.(callback)
  }
}

