import { getActiveTextEditor } from './getActiveTextEditor'
import { getLineText } from './getLineText'
import { getOffsetFromPosition } from './getOffsetFromPosition'

/**
 * 获取选中区域的一些信息
 * @returns 选中区域的一些信息
 */
export function getSelection() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor) {
    const { line, character } = activeTextEditor.selection.active
    const code = activeTextEditor.document.getText()
    return {
      line,
      character,
      lineText: activeTextEditor.document.lineAt(line).text,
      selection: activeTextEditor.selection,
      selectedTextArray: activeTextEditor.selections.map(selection =>
        code.slice(getOffsetFromPosition(selection.start, code), getOffsetFromPosition(selection.end, code)),
      ),
      selectionArray: activeTextEditor.selections.map(s => Object.assign(s, {
        lineText: getLineText(s.active.line)!,
        text: code.slice(getOffsetFromPosition(s.start, code), getOffsetFromPosition(s.end, code)),
      })),
    }
  }
}
