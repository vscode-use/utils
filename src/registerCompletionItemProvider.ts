import type { CancellationToken, CompletionItem, CompletionItemProvider, CompletionList, ProviderResult } from 'vscode'
import * as vscode from 'vscode'
import { addEffect } from './util'

/**
 * 注册自动补全
 * @param filter 设置针对什么语言才会触发自动补全
 * @param provideCompletionItems 为给定的职位和文件提供完成项目
 * @param resolveOrTrigger 给定一个完成项，填写更多数据或直接传入触发字符
 * @param triggerCharacters 触发条件比如通过输入某一个字符触发（在显式提供 resolve 时使用）
 * @returns Disposable
 */
export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(
  filter: string | string[],
  provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => ProviderResult<T[] | CompletionList<T>>,
  resolveOrTrigger?: ((item: T, token: CancellationToken) => ProviderResult<T>) | string | string[],
  triggerCharacters: string | string[] = [],
) {
  let resolveCompletionItem: ((item: T, token: CancellationToken) => ProviderResult<T>) | undefined
  let characters: string[]

  if (typeof resolveOrTrigger === 'function') {
    resolveCompletionItem = resolveOrTrigger
    characters = Array.isArray(triggerCharacters) ? triggerCharacters : [triggerCharacters]
  }
  else {
    const provided = resolveOrTrigger ?? triggerCharacters
    characters = Array.isArray(provided) ? provided : [provided]
  }

  const provider: CompletionItemProvider<T> = resolveCompletionItem
    ? { provideCompletionItems, resolveCompletionItem }
    : { provideCompletionItems }

  return addEffect(vscode.languages.registerCompletionItemProvider(
    filter,
    provider,
    ...characters,
  ))
}
