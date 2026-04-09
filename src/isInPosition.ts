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
 * @param code 源码文本，默认使用当前激活编辑器内容
 * @returns boolean
 */
export function isInPosition(
  parentLoc: RangeLoc,
  childLoc: PositionOption2,
  offset = 0,
  offsetLine = 1,
  startOffset = 0,
  endOffset = 0,
  code: string = getActiveText()!,
): boolean {
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
    const slicedCode = code.slice(offset)
    const startBoundaryOffset = getOffsetFromPosition(createPosition(parentLoc.start.line - offsetLine, (parentLoc.start.character || parentLoc.start.column)!), slicedCode)!
    const childOffset = getOffsetFromPosition(createPosition(childLoc), code)!
    if (childOffset < startBoundaryOffset + offset)
      return false
    const endBoundaryOffset = getOffsetFromPosition(createPosition(parentLoc.end.line - offsetLine, (parentLoc.end.character || parentLoc.end.column)!), slicedCode)!
    if (childOffset > endBoundaryOffset + offset)
      return false
  }
  return true
}
