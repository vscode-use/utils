import { getActiveTextEditor } from './getActiveTextEditor'

export function getSelection() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor) {
    const { line, character } = activeTextEditor.selection.active

    return {
      line,
      character,
      lineText: activeTextEditor.document.lineAt(line).text,
      selectedTextArray: activeTextEditor.selections.map(selection => activeTextEditor.document.getText(selection)),
    }
  }
}
