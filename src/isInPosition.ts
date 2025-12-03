import type { PositionOption2, RangeLoc } from './types'
import { createPosition } from './createPosition'
import { getActiveText } from './getActiveText'
import { getOffsetFromPosition } from './getOffsetFromPosition'

/**
 * 判断一个位置是否在另一个位置的范围内
 * @param parentLoc 父位置
 * @param childLoc 子位置
 * @param offset 偏移量
 * @param offsetLine 行偏移量，默认1
 * @param startOffset 起始位置的额外偏移量，默认0
 * @param endOffset 结束位置的额外偏移量，默认0
 * @returns boolean
 */
export function isInPosition(parentLoc: RangeLoc, childLoc: PositionOption2, offset = 0, offsetLine = 1, startOffset = 0, endOffset = 0) {
  if (offset === 0) {
    const { start, end } = parentLoc
    const startLine = start.line
    const startcharacter = start.column || start.character
    const endcharacter = end.column || end.character
    const endLine = end.line
    const { line } = childLoc
    const character = childLoc.column || childLoc.character
    if (line + offsetLine === startLine && character! <= startcharacter! - 1 + startOffset)
      return false
    if (line + offsetLine === endLine && character! > endcharacter! - 1 + endOffset)
      return false
    if (line + offsetLine < startLine)
      return false
    if (line + offsetLine > endLine)
      return false
  }
  else {
    const code = getActiveText()!.slice(offset)
    const startOffset = getOffsetFromPosition(createPosition(parentLoc.start.line - offsetLine, (parentLoc.start.character || parentLoc.start.column)!), code)!
    const childOffset = getOffsetFromPosition(createPosition(childLoc))!
    if (childOffset < startOffset + offset)
      return false
    const endOffset = getOffsetFromPosition(createPosition(parentLoc.end.line - offsetLine, (parentLoc.end.character || parentLoc.end.column)!), code)!
    if (childOffset > endOffset + offset)
      return false
  }
  return true
}
