import type { Position, Range, TextEditor } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

export interface VisibleRangeInfo {
  start: Position
  end: Position
  ranges: readonly Range[]
}

export function getVisibleRange(textEditor: TextEditor | undefined = getActiveTextEditor()): VisibleRangeInfo | null {
  const editor = textEditor
  if (!editor)
    return null
  const visibleRanges = editor.visibleRanges
  if (visibleRanges.length === 0)
    return null
  const start = visibleRanges[0].start
  const end = visibleRanges[visibleRanges.length - 1].end
  return {
    start,
    end,
    ranges: visibleRanges,
  }
}
