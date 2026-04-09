import type { TextEditor } from 'vscode'
import type { PositionOption1, PositionOption2 } from './types'
import { createPosition } from './createPosition'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'
import { getPosition } from './getPosition'
/**
 * 根据 position 和 offset 得到计算后的 position
 */
export function getCalcPosition(position: PositionOption2 | PositionOption1, offset: number, content: string): ReturnType<typeof getPosition>
export function getCalcPosition(position: PositionOption2 | PositionOption1, offset: number, textEditor?: TextEditor): ReturnType<typeof getPosition>
export function getCalcPosition(
  position: PositionOption2 | PositionOption1,
  offset: number,
  contentOrTextEditor?: string | TextEditor,
): ReturnType<typeof getPosition> {
  const content = typeof contentOrTextEditor === 'string'
    ? contentOrTextEditor
    : getActiveText(contentOrTextEditor)
  if (!content)
    return

  const pos = createPosition(position)
  const realOffset = getOffsetFromPosition(pos, content)! + offset
  return getPosition(realOffset, content)
}
