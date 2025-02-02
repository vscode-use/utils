import type { PositionOption1, PositionOption2 } from './types'
import { createPosition } from './createPosition'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'
import { getPosition } from './getPosition'
/**
 * 根据 position 和 offset 得到计算后的 position
 */
export function getCalcPosition(position: PositionOption2 | PositionOption1, offset: number, content: string = getActiveText()!) {
  const pos = createPosition(position)
  const realOffset = getOffsetFromPosition(pos)! + offset
  return getPosition(realOffset, content)
}
