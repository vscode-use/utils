import * as vscode from 'vscode'
import type { TextEditor } from 'vscode'

export function openFile(fileUri: string): Promise<TextEditor> {
  return new Promise((resolve) => {
    vscode.workspace
      .openTextDocument(fileUri)
      .then(doc => vscode.window.showTextDocument(doc).then(resolve))
  })
}
