import * as vscode from 'vscode'

export function getSelection() {
  const activeTextEditor = vscode.window.activeTextEditor
  if (activeTextEditor) {
    const { line, character } = activeTextEditor.selection.active
    return {
      line,
      character,
      lineText: activeTextEditor.document.lineAt(line).text,
      selectedText: activeTextEditor.document.getText(activeTextEditor.selection),
    }
  }
}
