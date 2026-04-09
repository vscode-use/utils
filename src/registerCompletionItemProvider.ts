import type { CompletionItem, CompletionItemProvider } from 'vscode'
import * as vscode from 'vscode'
import { addEffect } from './util'

export type TriggerCharacters = string | readonly string[]

/**
 * 注册自动补全
 * filter 设置针对什么语言才会触发自动补全。
 * provideCompletionItems 为给定的位置和文件提供完成项目。
 * 第三个参数既可以是 resolveCompletionItem，也可以直接传入触发字符。
 */
export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(
  filter: vscode.DocumentSelector,
  provideCompletionItems: CompletionItemProvider<T>['provideCompletionItems'],
  resolveCompletionItem: NonNullable<CompletionItemProvider<T>['resolveCompletionItem']>,
  triggerCharacters?: TriggerCharacters,
): vscode.Disposable
export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(
  filter: vscode.DocumentSelector,
  provideCompletionItems: CompletionItemProvider<T>['provideCompletionItems'],
  triggerCharacters?: TriggerCharacters,
): vscode.Disposable
export function registerCompletionItemProvider<T extends CompletionItem = CompletionItem>(
  filter: vscode.DocumentSelector,
  provideCompletionItems: CompletionItemProvider<T>['provideCompletionItems'],
  resolveOrTrigger?: NonNullable<CompletionItemProvider<T>['resolveCompletionItem']> | TriggerCharacters,
  triggerCharacters: TriggerCharacters = [],
): vscode.Disposable {
  let resolveCompletionItem: NonNullable<CompletionItemProvider<T>['resolveCompletionItem']> | undefined
  let characters: string[]

  if (typeof resolveOrTrigger === 'function') {
    resolveCompletionItem = resolveOrTrigger
    characters = toTriggerCharacters(triggerCharacters)
  }
  else {
    const provided = resolveOrTrigger ?? triggerCharacters
    characters = toTriggerCharacters(provided)
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

function toTriggerCharacters(characters?: TriggerCharacters): string[] {
  if (!characters)
    return []
  return typeof characters === 'string' ? [characters] : [...characters]
}
