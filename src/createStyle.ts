import * as vscode from 'vscode'
import type { DecorationRenderOptions } from 'vscode'

/**
 * 创建样式
 * @param options
 * @returns
 */
export function createStyle(options: DecorationRenderOptions) {
  return vscode.window.createTextEditorDecorationType(options)
}
