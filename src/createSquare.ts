import type { ThemeColor } from 'vscode'
import * as vscode from 'vscode'

/**
 * 创建一个方块
 * @param backgroundColor
 * @returns TextEditorDecorationType
 */
export function createSquare(backgroundColor: string | ThemeColor) {
  return vscode.window.createTextEditorDecorationType({
    before: {
      contentText: '',
      margin: '0 0.2em',
      width: '0.8em',
      height: '0.8em',
      backgroundColor,
    },
  })
}
