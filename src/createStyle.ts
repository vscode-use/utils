import * as vscode from 'vscode'
import type { DecorationRenderOptions } from 'vscode'

export function createStyle(options: DecorationRenderOptions) {
  return vscode.window.createTextEditorDecorationType(options)
}
