import type { Range, TextEditorRevealType } from './vscode-shim'
import { getActiveTextEditor } from './getActiveTextEditor'

export function scrollInToView(range: Range, viewColumn: TextEditorRevealType = 1) {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return

  activeTextEditor.revealRange(range, viewColumn)
}
