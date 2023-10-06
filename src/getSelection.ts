import * as vscode from 'vscode'

export function getSelection() {
  const activeTextEditor = vscode.window.activeTextEditor
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
