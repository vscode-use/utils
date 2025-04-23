import * as vscode from './vscode-shim'

export function toUri(absolutePath: string) {
  return vscode.Uri.file(absolutePath)
}
