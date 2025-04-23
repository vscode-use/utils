import type { CompletionItemOptions } from './createCompletionItem'
import { createCompletionItem } from './createCompletionItem'
import * as vscode from './vscode-shim'

/**
 * 创建补全项组
 * @param items CompletionItemOptions[]
 * @returns CompletionList
 */
export function createCompletionList(items: (CompletionItemOptions & { params?: any })[]) {
  return new vscode.CompletionList(items.map(createCompletionItem))
}
