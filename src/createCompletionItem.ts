import * as vscode from 'vscode'
import type { CompletionItemKind, SnippetString } from 'vscode'
import { createSnippetString } from './createSnippetString'

export function createCompletionItem(content: string, snippet?: string | SnippetString, type?: CompletionItemKind) {
  const completion = new vscode.CompletionItem(content, type)
  if (snippet !== undefined) {
    completion.insertText = typeof snippet === 'string'
      ? createSnippetString(snippet)
      : snippet
  }
  return completion
}
