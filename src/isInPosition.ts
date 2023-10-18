import type { RangeLoc } from './types'

export function isInPosition(parentLoc: RangeLoc, childLoc: RangeLoc) {
  const { start, end } = parentLoc
  const { line: startLine } = start
  const startcharacter = start.column || start.character
  const endcharacter = end.column || end.character
  const { line: endLine } = end
  const { line, character } = childLoc
  if (line + 1 === startLine && character < startcharacter!)
    return false
  if (line + 1 === endLine && character > endcharacter! - 1)
    return false
  if (line + 1 < startLine)
    return false
  if (line + 1 > endLine)
    return false
  return true
}
