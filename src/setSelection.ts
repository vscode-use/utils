import type { PositionOption1, PositionOption2 } from './types'
import * as vscode from 'vscode'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * Sets the selection in the active text editor.
 *
 * @param range - The range to set the selection to.
 * @param position - Optional. The position of the selection cursor. Can be 'left' or 'right'. Defaults to 'right'.
 * @param revealType - Optional. The type of reveal to use. Defaults to `vscode.TextEditorRevealType.Default`.
 * @param textEditor - Optional. The text editor to update. Defaults to the active editor.
 */
export function setSelection(range: vscode.Range, position?: 'left' | 'right', revealType?: vscode.TextEditorRevealType, textEditor?: vscode.TextEditor): void
/**
 * Sets the selection in the active text editor.
 *
 * @param start - The start position of the selection.
 * @param end - The end position of the selection.
 * @param position - Optional. The position of the selection cursor. Can be 'left' or 'right'. Defaults to 'right'.
 * @param revealType - Optional. The type of reveal to use. Defaults to `vscode.TextEditorRevealType.Default`.
 * @param textEditor - Optional. The text editor to update. Defaults to the active editor.
 */
export function setSelection(start: PositionOption2 | PositionOption1 | vscode.Position, end: PositionOption2 | PositionOption1 | vscode.Position, position?: 'left' | 'right', revealType?: vscode.TextEditorRevealType, textEditor?: vscode.TextEditor): void
/**
 * Sets the selection in the active text editor.
 *
 * @param start - The start position or range of the selection.
 * @param end - Optional. The end position of the selection or the position of the selection cursor if `start` is a range.
 * @param position - Optional. The position of the selection cursor if `start` is a range. Can be 'left' or 'right'. Defaults to 'right'.
 * @param revealType - Optional. The type of reveal to use if `start` is a range. Defaults to `vscode.TextEditorRevealType.Default`.
 * @param textEditor - Optional. The text editor to update. Defaults to the active editor.
 */
export function setSelection(
  start: vscode.Range | PositionOption2 | PositionOption1 | vscode.Position,
  end?: PositionOption2 | PositionOption1 | vscode.Position | 'left' | 'right',
  position?: 'left' | 'right' | vscode.TextEditorRevealType,
  revealType?: vscode.TextEditorRevealType | vscode.TextEditor,
  textEditor?: vscode.TextEditor,
): void {
  let range: vscode.Range
  let cursorPosition: 'left' | 'right'
  let reveal: vscode.TextEditorRevealType
  let targetTextEditor: vscode.TextEditor | undefined
  if (start instanceof vscode.Range) {
    range = start
    cursorPosition = typeof end === 'string' ? end : 'right'
    reveal = (typeof position === 'number' ? position : undefined) ?? vscode.TextEditorRevealType.Default
    targetTextEditor = revealType as vscode.TextEditor | undefined
  }
  else {
    range = createRange(start, end as PositionOption2 | PositionOption1 | vscode.Position)
    cursorPosition = (typeof position === 'string' ? position : undefined) ?? 'right'
    reveal = (typeof revealType === 'number' ? revealType : undefined) ?? vscode.TextEditorRevealType.Default
    targetTextEditor = textEditor
  }
  const selection = cursorPosition === 'left'
    ? new vscode.Selection(range.end, range.start)
    : new vscode.Selection(range.start, range.end)
  targetTextEditor = targetTextEditor ?? getActiveTextEditor()
  if (targetTextEditor) {
    targetTextEditor.selection = selection
    targetTextEditor.revealRange(range, reveal)
  }
}
