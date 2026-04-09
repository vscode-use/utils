import type { Range, Selection, TextEditor } from 'vscode'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'
import { getOffsetFromPosition } from './getOffsetFromPosition'

export type SelectionInfoItem = Selection & {
  lineText: string
  text: string
  selection: Range
}

export interface SelectionInfo {
  line: number
  character: number
  lineText: string
  selection: Selection
  selectedTextArray: string[]
  selectionArray: SelectionInfoItem[]
}

/**
 * 获取选中区域的一些信息
 * @returns 选中区域的一些信息
 */
export function getSelection(textEditor: TextEditor | undefined = getActiveTextEditor()): SelectionInfo | undefined {
  if (!textEditor)
    return

  const { line, character } = textEditor.selection.active
  const code = textEditor.document.getText()
  return {
    line,
    character,
    lineText: textEditor.document.lineAt(line).text,
    selection: textEditor.selection,
    selectedTextArray: textEditor.selections.map(selection =>
      code.slice(getOffsetFromPosition(selection.start, code), getOffsetFromPosition(selection.end, code)),
    ),
    selectionArray: textEditor.selections.map(s => Object.assign(s, {
      lineText: textEditor.document.lineAt(s.active.line).text,
      text: code.slice(getOffsetFromPosition(s.start, code), getOffsetFromPosition(s.end, code)),
      selection: createRange(s.start, s.end),
    })),
  }
}
