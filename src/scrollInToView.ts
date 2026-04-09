import type { Range, TextEditor, TextEditorRevealType } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

export function scrollInToView(
  range: Range,
  viewColumn: TextEditorRevealType = 1,
  textEditor: TextEditor | undefined = getActiveTextEditor(),
): void {
  if (!textEditor)
    return

  textEditor.revealRange(range, viewColumn)
}
