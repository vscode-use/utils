import * as vscode from 'vscode'
import type { Command, CompletionItemKind, MarkdownString, SnippetString } from 'vscode'
import { createSnippetString } from './createSnippetString'

interface CompletionItemOptions {
  content: string
  snippet?: string | SnippetString
  detail?: string
  type?: CompletionItemKind
  documentation?: string | MarkdownString
  sortText?: string
  filterText?: string
  preselect?: boolean
  keepWhitespace?: boolean
  command?: Command
}
export function createCompletionItem(options: CompletionItemOptions & { params: string | string[] }) {
  const { content, snippet, detail, type, documentation, sortText, filterText, preselect, keepWhitespace, command, params } = options
  const completion = new vscode.CompletionItem(content, type) as any
  if (snippet !== undefined) {
    completion.insertText = typeof snippet === 'string'
      ? createSnippetString(snippet)
      : snippet
  }
  if (documentation)
    completion.documentation = documentation
  if (detail)
    completion.detail = detail
  if (sortText)
    completion.sortText = sortText
  if (filterText)
    completion.filterText = filterText
  completion.preselect = preselect
  if (keepWhitespace)
    completion.keepWhitespace = keepWhitespace
  if (command)
    completion.command = command
  if (params)
    completion.params = params
  return completion
}
