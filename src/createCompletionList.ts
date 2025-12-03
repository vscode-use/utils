import type { CompletionItemOptions, CreatedCompletionItem } from './createCompletionItem'
import * as vscode from 'vscode'
import { createCompletionItem } from './createCompletionItem'

/**
 * 创建补全项组
 * @param items CompletionItemOptions[]
 * @returns CompletionList
 */
export function createCompletionList<TParams = unknown>(items: (CompletionItemOptions & { params?: TParams })[]): vscode.CompletionList<CreatedCompletionItem<TParams>> {
  return new vscode.CompletionList(items.map(item => createCompletionItem(item)))
}
