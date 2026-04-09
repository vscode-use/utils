import type { CompletionItemExtras, CompletionItemInput, CreatedCompletionItem } from './createCompletionItem'
import * as vscode from 'vscode'
import { createCompletionItem } from './createCompletionItem'

export type CreatedCompletionList<
  TParams = unknown,
  TExtra extends object = CompletionItemExtras,
> = vscode.CompletionList<CreatedCompletionItem<TParams, TExtra>>

/**
 * 创建补全项组
 * @param items CompletionItemOptions[]
 * @returns CompletionList
 */
export function createCompletionList<TParams = unknown, TExtra extends object = CompletionItemExtras>(
  items: readonly CompletionItemInput<TParams, TExtra>[],
  isIncomplete?: boolean,
): CreatedCompletionList<TParams, TExtra> {
  return new vscode.CompletionList(items.map(item => createCompletionItem<TParams, TExtra>(item)), isIncomplete)
}
