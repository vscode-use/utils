import * as vscode from 'vscode'
import type { CompletionItem } from 'vscode'
export function registerCompletionItemProvider(filter: string | string[], provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => CompletionItem[], triggerCharacters: string[] = []) {
  return vscode.languages.registerCompletionItemProvider(
    filter,
    {
      provideCompletionItems,
      ...triggerCharacters,
    },
  )
}
