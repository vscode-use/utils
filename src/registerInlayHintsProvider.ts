import * as vscode from 'vscode'
import type { DocumentSelector } from 'vscode'
import { addEffect } from './util'

/**
 * 注册inlayHints事件
 * @param filter 针对哪一类文件
 * @param callback 回调函数，可返回一个InlayHint控制显示的内容
 * @returns Disposable
 */
export function registerInlayHintsProvider(filter: DocumentSelector, callback: (document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken) => vscode.ProviderResult<vscode.InlayHint[]>) {
  class MyInlayHintsProvider implements vscode.InlayHintsProvider {
    provideInlayHints(document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken): vscode.ProviderResult<vscode.InlayHint[]> {
      return callback(document, range, token)
    }
  }
  return addEffect(vscode.languages.registerInlayHintsProvider(filter, new MyInlayHintsProvider()))
}
