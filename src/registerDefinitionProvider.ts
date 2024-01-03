import * as vscode from 'vscode'
import type { DefinitionProvider, DocumentSelector } from 'vscode'

/**
 * 注册cmd选中关键词的事件
 * @param selector 针对哪一类文件
 * @param provideDefinition 回调函数，可返回一个location控制跳转到哪一个路径
 * @returns
 */
export function registerDefinitionProvider(selector: DocumentSelector, provideDefinition: DefinitionProvider['provideDefinition']) {
  return vscode.languages.registerDefinitionProvider(selector, { provideDefinition })
}
