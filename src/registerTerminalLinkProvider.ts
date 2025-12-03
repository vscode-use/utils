import type { ProviderResult } from 'vscode'
import * as vscode from 'vscode'
import { addEffect } from './util'

/**
 * 注册终端链接提供者
 * @param provideTerminalLinks 回调函数，可返回终端中可点击的链接
 * @param handleTerminalLink 回调函数，处理链接点击事件
 * @returns Disposable
 */
export function registerTerminalLinkProvider(
  provideTerminalLinks: (context: vscode.TerminalLinkContext, token: vscode.CancellationToken) => ProviderResult<vscode.TerminalLink | vscode.TerminalLink[]>,
  handleTerminalLink: (link: vscode.TerminalLink) => void,
): vscode.Disposable {
  return addEffect(vscode.window.registerTerminalLinkProvider({
    provideTerminalLinks,
    handleTerminalLink,
  }))
}
