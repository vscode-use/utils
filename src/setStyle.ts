import type { Range, TextEditorDecorationType } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
export function setStyle(decorationType: TextEditorDecorationType, range?: Range) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.setDecorations(decorationType, range ? [range] : [])
}
