import * as vscode from 'vscode'

export function createCompletionKind(v: keyof typeof vscode.CompletionItemKind) {
  return vscode.CompletionItemKind[v]
}
