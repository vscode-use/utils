import * as vscode from 'vscode'

export function nextTick(fn: () => void) {
  return vscode.workspace.applyEdit(new vscode.WorkspaceEdit()).then(fn)
}
