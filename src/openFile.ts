import * as vscode from 'vscode'
import type { TextDocumentShowOptions, TextEditor } from 'vscode'

export function openFile(fileUri: string, showOptions?: TextDocumentShowOptions): Promise<TextEditor> {
  return new Promise((resolve) => {
    vscode.workspace
      .openTextDocument(fileUri)
      .then(doc => vscode.window.showTextDocument(doc, showOptions).then(resolve))
  })
}
