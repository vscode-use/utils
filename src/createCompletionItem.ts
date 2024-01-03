import * as vscode from 'vscode'
import type { Command, CompletionItemKind, MarkdownString, SnippetString } from 'vscode'
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
  [key: string]: any
}

/**
 * 创建补全项
 * @param options  {
  content: string // 补全项的内容
  snippet?: string | SnippetString // 补全项的代码片段
  detail?: string // 补全项的详细信息
  type?: CompletionItemKind // 补全项的类型
  documentation?: string | MarkdownString // 补全项的文档
  sortText?: string // 补全项的排序文本
  filterText?: string // 补全项的过滤文本
  preselect?: boolean // 补全项是否预选
  keepWhitespace?: boolean // 补全项是否保留空格
  command?: Command // 补全项的命令
  [key: string]: any // 补全项的其他属性
}
 * @returns
 */
export function createCompletionItem(options: CompletionItemOptions & { params?: string | string[] }) {
  const { content, snippet, type } = options

  return Object.assign(new vscode.CompletionItem(content, type) as any,
    options,
    {
      insertText: typeof snippet === 'string'
        ? createSnippetString(snippet)
        : snippet,
    })
}
