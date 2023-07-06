import * as vscode from 'vscode'
import type { CompletionItemKind, SnippetString } from 'vscode'
import { createSnippetString } from './createSnippetString'

interface CompletionItemOptions {
  content: string
  snippet?: string | SnippetString
  detail?: string
  type?: CompletionItemKind
}
export function createCompletionItem(options: CompletionItemOptions) {
  const { content, snippet, detail, type } = options
  const completion = new vscode.CompletionItem(content, type)
  if (snippet !== undefined) {
    completion.insertText = typeof snippet === 'string'
      ? createSnippetString(snippet)
      : snippet
  }
  if (detail)
    completion.detail = detail
  return completion
}
