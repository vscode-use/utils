import type * as vscode from './vscode-shim'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'
/**
 * 根据offset获取行列
 */
export function getPositionBeforeCode(position: vscode.Position, code: string = getActiveText()!) {
  const offset = getOffsetFromPosition(position, code)
  return code.slice(0, offset)
}
