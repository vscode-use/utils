import * as vscode from 'vscode'
import type { Uri } from 'vscode'

export function rename(oldUri: Uri, newUri: Uri) {
  return vscode.workspace.fs.rename(oldUri, newUri)
}
