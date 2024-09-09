import * as vscode from 'vscode'
import type { DecorationRenderOptions } from 'vscode'

/**
 * 创建样式
 * @param options
 * @returns TextEditorDecorationType
 */
export function createStyle(options: DecorationRenderOptions) {
  return vscode.window.createTextEditorDecorationType({ rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed, ...options })
}
