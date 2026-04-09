import type { TextEditor } from 'vscode'
import type * as vscode from 'vscode'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'
/**
 * 根据offset获取行列
 */
export function getPositionBeforeCode(position: vscode.Position, code: string): string
export function getPositionBeforeCode(position: vscode.Position, textEditor?: TextEditor): string | undefined
export function getPositionBeforeCode(position: vscode.Position, codeOrTextEditor?: string | TextEditor): string | undefined {
  const code = typeof codeOrTextEditor === 'string'
    ? codeOrTextEditor
    : getActiveText(codeOrTextEditor)
  if (!code)
    return

  const offset = getOffsetFromPosition(position, code)
  return code.slice(0, offset)
}
