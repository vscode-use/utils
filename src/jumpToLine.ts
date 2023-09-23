import * as vscode from 'vscode'
import type { TextEditor } from 'vscode'
import { openFile } from './openFile'

export function jumpToLine(lineNumber: number, filepath: string | TextEditor | undefined = vscode.window.activeTextEditor) {
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

export function toLine(lineNumber: number, editor: TextEditor) {
  const range = new vscode.Range(lineNumber - 1, 0, lineNumber, 0)
  editor.revealRange(range, vscode.TextEditorRevealType.InCenter)
  editor.selection = new vscode.Selection(range.start, range.start)
}
