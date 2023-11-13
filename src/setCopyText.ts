import * as vscode from 'vscode'

export function setCopyText(text: string) {
  return vscode.env.clipboard.writeText(text)
}
