import * as vscode from 'vscode'
import type { CodeActionProvider, CodeActionProviderMetadata, DocumentSelector } from 'vscode'

/**
 * 注册代码动作提供程序。
 *
 * 一种语言可注册多个提供程序。在这种情况下
 * 并行询问，然后合并结果。失败的提供程序（被拒绝的承诺或异常）不会导致整个操作失败。
 * 不会导致整个操作失败。
 *
 * @param selector 一个选择器，用于定义此提供程序适用的文档。
 * @param provider 一个代码操作提供程序。
 * @param metadata 关于提供者提供的代码操作类型的元数据。
 * @return 一个{@link Disposable}，当该提供程序被弃置时会取消注册。
 */
export function registerCodeActionsProvider(selector: DocumentSelector, provider: CodeActionProvider, metadata?: CodeActionProviderMetadata) {
  return vscode.languages.registerCodeActionsProvider(selector, provider, metadata)
}
