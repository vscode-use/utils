import * as vscode from 'vscode'
import { createRange } from './createRange'
import type { PositionOption1, PositionOption2 } from './types'

export function setSelection(start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1, position: 'left' | 'right' = 'right') {
  const range = createRange(start, end)
  const selection = position === 'left'
    ? new vscode.Selection(range.end, range.start)
    : new vscode.Selection(range.start, range.end)
  const editor = vscode.window.activeTextEditor!
  editor.selection = selection
  editor.revealRange(range)
}
