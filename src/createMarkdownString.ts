import * as vscode from './vscode-shim'

export function createMarkdownString() {
  const md = new vscode.MarkdownString()
  md.isTrusted = true
  md.supportHtml = true
  return md
}
