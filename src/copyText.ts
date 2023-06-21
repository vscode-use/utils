import * as vscode from 'vscode'

export function copyText(text: string) {
  return vscode.env.clipboard.writeText(text)
}
