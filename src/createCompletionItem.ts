import * as vscode from 'vscode'
import type { CompletionItemKind, MarkdownString, SnippetString } from 'vscode'
import { createSnippetString } from './createSnippetString'

interface CompletionItemOptions {
  content: string
  snippet?: string | SnippetString
  detail?: string
  type?: CompletionItemKind
  documentation?: string | MarkdownString
}
export function createCompletionItem(options: CompletionItemOptions) {
  const { content, snippet, detail, type, documentation } = options
  const completion = new vscode.CompletionItem(content, type)
  if (snippet !== undefined) {
    completion.insertText = typeof snippet === 'string'
      ? createSnippetString(snippet)
      : snippet
  }
  if (documentation)
    completion.documentation = documentation
  if (detail)
    completion.detail = detail
  return completion
}
