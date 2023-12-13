import * as vscode from 'vscode'
import type { Range, TextEditor } from 'vscode'

export function openFile(fileUri: string, selection?: Range): Promise<TextEditor> {
  return new Promise((resolve) => {
    vscode.workspace
      .openTextDocument(fileUri)
      .then(doc => vscode.window.showTextDocument(doc, { selection }).then(resolve))
  })
}
