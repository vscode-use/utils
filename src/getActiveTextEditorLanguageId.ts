import * as vscode from 'vscode'

export function getActiveTextEditorLanguageId() {
  const editor = vscode.window.activeTextEditor
  if (editor)
    return editor.document.languageId
}
