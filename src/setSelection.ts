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
 */
export function setSelection(range: vscode.Range, position?: 'left' | 'right', revealType?: vscode.TextEditorRevealType): void
/**
 * Sets the selection in the active text editor.
 *
 * @param start - The start position of the selection.
 * @param end - The end position of the selection.
 * @param position - Optional. The position of the selection cursor. Can be 'left' or 'right'. Defaults to 'right'.
 * @param revealType - Optional. The type of reveal to use. Defaults to `vscode.TextEditorRevealType.Default`.
 */
export function setSelection(start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1, position?: 'left' | 'right', revealType?: vscode.TextEditorRevealType): void
/**
 * Sets the selection in the active text editor.
 *
 * @param start - The start position or range of the selection.
 * @param end - Optional. The end position of the selection or the position of the selection cursor if `start` is a range.
 * @param position - Optional. The position of the selection cursor if `start` is a range. Can be 'left' or 'right'. Defaults to 'right'.
 * @param revealType - Optional. The type of reveal to use if `start` is a range. Defaults to `vscode.TextEditorRevealType.Default`.
 */
export function setSelection<T extends vscode.Range | PositionOption2 | PositionOption1>(start: T, end?: T extends vscode.Range ? 'left' | 'right' : PositionOption2 | PositionOption1, position?: T extends vscode.Range ? vscode.TextEditorRevealType : 'left' | 'right', revealType?: vscode.TextEditorRevealType) {
  let range: vscode.Range
  if (start instanceof vscode.Range) {
    range = start
    revealType = position as vscode.TextEditorRevealType ?? 1
    position = end as any ?? 'right'
  }
  else {
    range = createRange(start, end as PositionOption2)
    position = position as any ?? 'right'
    revealType = revealType ?? 1
  }
  const selection = position === 'left'
    ? new vscode.Selection(range.end, range.start)
    : new vscode.Selection(range.start, range.end)
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor) {
    activeTextEditor.selection = selection
    activeTextEditor.revealRange(range, revealType)
  }
}
