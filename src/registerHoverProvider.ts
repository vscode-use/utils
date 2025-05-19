import type { DocumentSelector, HoverProvider } from 'vscode'
import * as vscode from 'vscode'
import { addEffect } from './util'

/**
 * 注册鼠标悬停事件
 * @param selector 针对哪一类文件
 * @param provideHover 回调函数，可返回一个Hover控制鼠标悬停时显示的内容
 * @returns Disposable
 */
export function registerHoverProvider(selector: DocumentSelector, provideHover: HoverProvider['provideHover'], output?: boolean) {
  const provideHoverWrapper: HoverProvider['provideHover'] = (document, position, token) => {
    // 不处理 hover output 时的事件
    if (!output && document.uri.scheme === 'output')
      return

    return provideHover(document, position, token)
  }
  return addEffect(vscode.languages.registerHoverProvider(selector, { provideHover: provideHoverWrapper }))
}
