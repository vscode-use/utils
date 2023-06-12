import * as vscode from 'vscode'
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
    ;(vscode.window as any)[name]?.(callback)
  }
  else if (type in workspaceMap) {
    const name = eventMap[type]
    ;(vscode.workspace as any)[name]?.(callback)
  }
}

type EventType =
  | 'terminal-close'
  | 'terminal-open'
  | 'terminal-change'
  | 'theme-change'
  | 'selection-change'
  | 'editor-visible'
  | 'text-change'
  | 'text-open'
  | 'text-save'
  | 'folder-change'
  | 'file-create'
  | 'file-delete'
  | 'rename'
