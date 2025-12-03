import type { Command, Range, SnippetString } from 'vscode'
import * as vscode from 'vscode'
import { createSnippetString } from './createSnippetString'

export interface InlineCompletionItemOptions {
  insertText: string | SnippetString
  filterText?: string
  range?: Range
  command?: Command
  insertAsSnippet?: boolean
}

/**
 * 创建补全项
 * @param options InlineCompletionItemOptions
 * @param options.insertText string | SnippetString 补全项的内容
 * @param options.filterText string 补全项的过滤文本
 * @param options.range Range 补全项的范围
 * @param options.command Command 补全项的命令
 * @returns InlineCompletionItem
 */
export function createInlineCompletionItem<TParams extends string | string[] | undefined = undefined>(options: InlineCompletionItemOptions & { params?: TParams }) {
  const { insertText, range, command, insertAsSnippet } = options
  const normalizedInsertText = typeof insertText === 'string' && insertAsSnippet
    ? createSnippetString(insertText)
    : insertText

  return Object.assign(new vscode.InlineCompletionItem(normalizedInsertText, range, command), options)
}
