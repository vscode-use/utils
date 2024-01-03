import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取选中区域的一些信息
 * @returns
 */
export function getSelection() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor) {
    const { line, character } = activeTextEditor.selection.active

    return {
      line,
      character,
      lineText: activeTextEditor.document.lineAt(line).text,
      selection: activeTextEditor.selection,
      selectedTextArray: activeTextEditor.selections.map(selection => activeTextEditor.document.getText(selection)),
    }
  }
}
