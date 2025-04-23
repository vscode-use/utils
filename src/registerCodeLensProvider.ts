import type { CodeLensProvider, DocumentSelector } from './vscode-shim'
import { addEffect } from './util'
import * as vscode from './vscode-shim'

/**
 * 注册代码镜头提供商。多个提供商可以注册一种语言。在这种情况下，供应商被要求在并行，结果被合并。失败的提供商（被拒绝的承诺或例外）将不会导致整个操作失败。
 * @param selector 定义此提供商适用的文档的选择器。
 * @param provider 代码镜头提供商。
 * @return A {@link Disposable} 在处置时取消注册此提供商。
 */
export function registerCodeLensProvider(selector: DocumentSelector, provider: CodeLensProvider) {
  return addEffect(vscode.languages.registerCodeLensProvider(selector, provider))
}
