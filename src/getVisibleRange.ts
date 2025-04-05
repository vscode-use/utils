import { getActiveTextEditor } from './getActiveTextEditor'

export function getVisibleRange() {
  const editor = getActiveTextEditor()
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
