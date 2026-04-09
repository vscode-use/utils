import type { Position, TextEditor } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position计算出offset位置
 * @param position
 * @param code 可选参数，传入 code 时按文本计算，传入 textEditor 时按编辑器文档计算
 */
export function getOffsetFromPosition(position: Position, code: string): number
export function getOffsetFromPosition(position: Position, textEditor?: TextEditor): number | undefined
export function getOffsetFromPosition(position: Position, code?: string | TextEditor): number | undefined {
  if (typeof code === 'string')
    return code.split('\n').slice(0, position.line).reduce((prev, cur) => prev + cur.length + 1, 0) + (position.character || 0)

  return (code ?? getActiveTextEditor())?.document.offsetAt(position)
}
