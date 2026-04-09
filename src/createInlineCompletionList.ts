import type { CreatedInlineCompletionItem, InlineCompletionItemInput } from './createInlineCompletionItem'
import * as vscode from 'vscode'
import { createInlineCompletionItem } from './createInlineCompletionItem'

export type CreatedInlineCompletionList<
  TParams extends string | string[] | undefined = undefined,
> = vscode.InlineCompletionList
  & { items: CreatedInlineCompletionItem<TParams>[] }

/**
 * 创建补全项组
 * @param items InlineCompletionItemOptions[]
 * @returns InlineCompletionList
 */
export function createInlineCompletionList<TParams extends string | string[] | undefined = string | string[] | undefined>(
  items: InlineCompletionItemInput<TParams>[],
): CreatedInlineCompletionList<TParams> {
  return new vscode.InlineCompletionList(items.map(item => createInlineCompletionItem<TParams>(item))) as CreatedInlineCompletionList<TParams>
}
