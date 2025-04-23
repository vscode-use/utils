import type { InlineCompletionItemOptions } from './createInlineCompletionItem'
import { createInlineCompletionItem } from './createInlineCompletionItem'
import * as vscode from './vscode-shim'

/**
 * 创建补全项组
 * @param items InlineCompletionItemOptions[]
 * @returns InlineCompletionList
 */
export function createInlineCompletionList(items: (InlineCompletionItemOptions & { params?: string | string[] })[]) {
  return new vscode.InlineCompletionList(items.map(createInlineCompletionItem))
}
