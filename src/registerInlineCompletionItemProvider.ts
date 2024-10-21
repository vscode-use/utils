import * as vscode from 'vscode'
import type { InlineCompletionItem, InlineCompletionList, ProviderResult } from 'vscode'
import { addEffect } from './util'

/**
 * 注册内联自动补全
 * @param provideInlineCompletionItems 回调函数，可返回一个InlineCompletionItem控制显示的内容
 * @returns Disposable
 */
export function registerInlineCompletionItemProvider(provideInlineCompletionItems: (document: vscode.TextDocument,
  position: vscode.Position,
  context: vscode.InlineCompletionContext,
  token: vscode.CancellationToken) => ProviderResult<InlineCompletionItem[] | InlineCompletionList>,
) {
  return addEffect(vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, {
    provideInlineCompletionItems,
  }))
}
