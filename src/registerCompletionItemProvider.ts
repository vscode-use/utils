import * as vscode from 'vscode'
import type { CancellationToken, CompletionItem, CompletionList, ProviderResult } from 'vscode'
import { addEffect } from './util'

/**
 * 注册自动补全
 * @param filter 设置针对什么语言才会触发自动补全
 * @param provideCompletionItems 为给定的职位和文件提供完成项目
 * @param resolveCompletionItem 给定一个完成项，填写更多数据
 * @param triggerCharacters 触发条件比如通过输入某一个字符触发
 * @returns Disposable
 */
export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(filter: string | string[], provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => ProviderResult<T[] | CompletionList<T>>, resolveCompletionItem: ((item: T, token: CancellationToken) => ProviderResult<T>) | string | string[], triggerCharacters: string | string[] = []) {
  if (typeof resolveCompletionItem !== 'function') {
    triggerCharacters = resolveCompletionItem
    resolveCompletionItem = ''
  }
  if (typeof triggerCharacters === 'string')
    triggerCharacters = [triggerCharacters]
  return addEffect(vscode.languages.registerCompletionItemProvider(
    filter,
    resolveCompletionItem
      ? {
          provideCompletionItems,
          resolveCompletionItem,
        } as any
      : { provideCompletionItems },
    ...triggerCharacters,
  ))
}
