import * as vscode from 'vscode'
import type { TextEditor, Range } from 'vscode'
import { openFile } from './openFile'
import { getCurrentFileUrl } from './getCurrentFileUrl'
import { PositionOption1 } from './types'

export function jumpToLine(lineNumber: number | PositionOption1 | [PositionOption1, PositionOption1] | Range, filepath = getCurrentFileUrl()) {
  let range: Range
  if (typeof lineNumber === 'number') {
    range = new vscode.Range(lineNumber, 0, lineNumber, 0)
  } else if (lineNumber instanceof vscode.Range) {
    range = lineNumber
  } else if (Array.isArray(lineNumber)) {
    if (typeof lineNumber[0] === 'number') {
      const _lineNumber = lineNumber as PositionOption1
      range = new vscode.Range(_lineNumber[0], _lineNumber[1], _lineNumber[0], _lineNumber[1])
    } else {
      const _lineNumber = lineNumber as [PositionOption1, PositionOption1]
      range = new vscode.Range(_lineNumber[0][0], _lineNumber[0][1], _lineNumber[1][0], _lineNumber[1][1])
    }
  } else {
    range = new vscode.Range(0, 0, 0, 0)
  }
  return openFile(filepath, range)
}

export function toLine(lineNumber: number | [number, number], editor: TextEditor) {
  let range
  if (Array.isArray(lineNumber))
    range = new vscode.Range(lineNumber[0] - 1, lineNumber[1], lineNumber[0], 0)
  else
    range = new vscode.Range(lineNumber - 1, 0, lineNumber, 0)
  editor.revealRange(range, vscode.TextEditorRevealType.InCenter)
  editor.selection = new vscode.Selection(range.start, range.start)
}
