import type { TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

export function updateText(callback: (editBuilder: TextEditorEdit) => void) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    activeTextEditor.edit(callback)
}
