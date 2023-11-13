import * as vscode from 'vscode'

export function getCopyText() {
  return vscode.env.clipboard.readText()
}
