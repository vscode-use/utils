import * as vscode from 'vscode'
import type { CompletionItemKind } from 'vscode'

export function CompletionItem(content: string, type?: CompletionItemKind) {
  return new vscode.CompletionItem(content, type)
}
