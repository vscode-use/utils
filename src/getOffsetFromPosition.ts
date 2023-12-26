import type { Position } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position计算出offset位置
 * @param position
 * @param code 可选参数，如果传入了code，则会根据code计算出offset，如果不填会用当前激活的文档
 */
export function getOffsetFromPosition(position: Position, code?: string) {
  if (code)
    return code.split('\n').slice(0, position.line).reduce((prev, cur) => prev + cur.length + 1, 0) + position.character

  return getActiveTextEditor()?.document.offsetAt(position)
}
