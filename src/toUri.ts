import * as vscode from 'vscode'

export function toUri(absolutePath: string) {
  return vscode.Uri.file(absolutePath)
}
