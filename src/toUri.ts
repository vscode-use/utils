import * as vscode from 'vscode'

export function toUri(absolutePath: string): vscode.Uri {
  return vscode.Uri.file(absolutePath)
}
