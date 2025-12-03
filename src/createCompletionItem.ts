import type { Command, CompletionItemKind, MarkdownString, Range, SnippetString } from 'vscode'
import * as vscode from 'vscode'
import { createSnippetString } from './createSnippetString'

export interface CompletionItemOptions {
  content: string
  snippet?: string | SnippetString
  detail?: string
  type?: CompletionItemKind
  documentation?: string | MarkdownString
  sortText?: string
  filterText?: string
  preselect?: boolean
  keepWhitespace?: boolean
  command?: Command
  range?: Range | {
    /**
     * The range that should be used when insert-accepting a completion. Must be a prefix of `replaceRange`.
     */
    inserting: Range
    /**
     * The range that should be used when replace-accepting a completion.
     */
    replacing: Range
  }
  [key: string]: any
}

export type CreatedCompletionItem<TParams = unknown> = vscode.CompletionItem & CompletionItemOptions & { params?: TParams }

/**
 * 创建补全项
 * @param options CompletionItemOptions
 * @param options.content string 补全项的内容
 * @param options.snippet string | SnippetString 补全项的代码片段
 * @param options.detail string 补全项的详细信息
 * @param options.type CompletionItemKind 补全项的类型
 * @param options.documentation string | MarkdownString 补全项的文档
 * @param options.sortText string 补全项的排序文本
 * @param options.filterText string 补全项的过滤文本
 * @param options.preselect boolean 补全项是否预选
 * @param options.keepWhitespace boolean 补全项是否保留空格
 * @param options.command Command 补全项的命令
 * @param options.range Range 补全项的范围
 * @returns CompletionItem
 */
export function createCompletionItem<TParams = unknown>(options: CompletionItemOptions & { params?: TParams }): CreatedCompletionItem<TParams> {
  const { content, snippet, type } = options
  const completionItem = new vscode.CompletionItem(content, type)
  Object.assign(completionItem, options, {
    insertText: typeof snippet === 'string'
      ? createSnippetString(snippet)
      : snippet,
  })
  return completionItem as CreatedCompletionItem<TParams>
}
