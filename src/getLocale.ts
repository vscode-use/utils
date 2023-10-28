import * as vscode from 'vscode'

export function getLocale() {
  return vscode.env.language
}
