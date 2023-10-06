import * as vscode from 'vscode'
export function openExternalUrl(uri: string) {
  return vscode.env.openExternal(vscode.Uri.parse(uri))
}
