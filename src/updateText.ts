import * as vscode from 'vscode'
import type { TextEditorEdit } from 'vscode'

export function updateText(callback: (editBuilder: TextEditorEdit) => void) {
  const textEditor = vscode.window.activeTextEditor
  if (!textEditor)
    return
  textEditor.edit(callback)
}
