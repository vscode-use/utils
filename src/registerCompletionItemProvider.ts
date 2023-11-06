import * as vscode from 'vscode'
import type { CancellationToken, CompletionItem, ProviderResult } from 'vscode'

export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(filter: string | string[], provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => CompletionItem[], resolveCompletionItem: ((item: T, token: CancellationToken) => ProviderResult<T>) | string | string[], triggerCharacters: string | string[] = []) {
  if (typeof resolveCompletionItem !== 'function') {
    triggerCharacters = resolveCompletionItem
    resolveCompletionItem = ''
  }
  if (typeof triggerCharacters === 'string')
    triggerCharacters = [triggerCharacters]
  return vscode.languages.registerCompletionItemProvider(
    filter,
    resolveCompletionItem
      ? {
          provideCompletionItems,
          resolveCompletionItem,
        } as any
      : { provideCompletionItems },
    ...triggerCharacters,
  )
}

