import * as vscode from 'vscode'
import type { InlineCompletionItem, InlineCompletionList, ProviderResult } from 'vscode'

export function registerInlineCompletionItemProvider(callback: (document: vscode.TextDocument,
  position: vscode.Position,
  context: vscode.InlineCompletionContext,
  token: vscode.CancellationToken) => ProviderResult<InlineCompletionItem[] | InlineCompletionList>) {
  vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, {
    provideInlineCompletionItems(
      document: vscode.TextDocument,
      position: vscode.Position,
      context: vscode.InlineCompletionContext,
      token: vscode.CancellationToken,
    ) {
      return callback(document, position, context, token)
    },
  })
}
