import * as vscode from 'vscode'

export function createMarkdownString(): vscode.MarkdownString {
  const md = new vscode.MarkdownString()
  md.isTrusted = true
  md.supportHtml = true
  return md
}
