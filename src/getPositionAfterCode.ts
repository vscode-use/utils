import type * as vscode from 'vscode'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'
/**
 * 根据offset获取行列
 */
export function getPositionAfterCode(position: vscode.Position, code: string = getActiveText()!) {
  const offset = getOffsetFromPosition(position, code)
  return code.slice(offset)
}
