import type { PositionOption2, RangeLoc } from './types'

export function isInPosition(parentLoc: RangeLoc, childLoc: PositionOption2) {
  const { start, end } = parentLoc
  const startLine = start.line
  const startcharacter = start.column || start.character
  const endcharacter = end.column || end.character
  const endLine = end.line
  const { line } = childLoc
  const character = childLoc.column || childLoc.character
  if (line + 1 === startLine && character! < startcharacter!)
    return false
  if (line + 1 === endLine && character! > endcharacter! - 1)
    return false
  if (line + 1 < startLine)
    return false
  if (line + 1 > endLine)
    return false
  return true
}
