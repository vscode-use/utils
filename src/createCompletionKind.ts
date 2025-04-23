import * as vscode from './vscode-shim'

export function createCompletionKind(v: keyof typeof vscode.CompletionItemKind) {
  return vscode.CompletionItemKind[v]
}
