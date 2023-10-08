import * as vscode from 'vscode'
import type { TextEditor } from 'vscode'
import { openFile } from './openFile'

export function jumpToLine(lineNumber: number | [number, number], filepath: string | TextEditor | undefined = vscode.window.activeTextEditor) {
  if (!filepath)
    return
  if (typeof filepath === 'string') {
    openFile(filepath).then((editor) => {
      toLine(lineNumber, editor)
    })
  }
  else {
    toLine(lineNumber, filepath)
  }
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
