import * as vscode from 'vscode'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'
import type { PositionOption1, PositionOption2 } from './types'

export function setSelection(start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1, position: 'left' | 'right' = 'right') {
  const range = createRange(start, end)
  const selection = position === 'left'
    ? new vscode.Selection(range.end, range.start)
    : new vscode.Selection(range.start, range.end)
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor) {
    activeTextEditor.selection = selection
    activeTextEditor.revealRange(range)
  }
}
