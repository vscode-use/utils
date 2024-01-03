import * as vscode from 'vscode'
import type { InlineCompletionItem, InlineCompletionList, ProviderResult } from 'vscode'

/**
 * 注册内联自动补全
 * @param callback 回调函数，可返回一个InlineCompletionItem控制显示的内容
 * @returns
 */
export function registerInlineCompletionItemProvider(callback: (document: vscode.TextDocument,
  position: vscode.Position,
  context: vscode.InlineCompletionContext,
  token: vscode.CancellationToken) => ProviderResult<InlineCompletionItem[] | InlineCompletionList>) {
  return vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, {
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
