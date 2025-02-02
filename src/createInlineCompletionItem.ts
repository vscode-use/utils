import type { Command, Range, SnippetString } from 'vscode'
import * as vscode from 'vscode'
import { createSnippetString } from './createSnippetString'

export interface InlineCompletionItemOptions {
  insertText: string | SnippetString
  filterText?: string
  range?: Range
  command?: Command
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
export function createInlineCompletionItem(options: InlineCompletionItemOptions & { params?: string | string[] }) {
  const { insertText, range, command } = options

  return Object.assign(new vscode.InlineCompletionItem(typeof range === 'string'
    ? createSnippetString(insertText as string)
    : insertText, range, command) as any, options)
}
