import { getActiveTextEditor } from './getActiveTextEditor'
import { getOffsetFromPosition } from './getOffsetFromPosition'

/**
 * 获取选中区域的一些信息
 * @returns
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
    }
  }
}
