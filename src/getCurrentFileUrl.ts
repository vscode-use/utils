import * as vscode from 'vscode'

export function getCurrentFileUrl() {
  return vscode.window.activeTextEditor!.document.uri.fsPath
}
