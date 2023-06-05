import * as vscode from 'vscode'

export function openFile(fileUri: string) {
  vscode.workspace
    .openTextDocument(fileUri)
    .then(doc => vscode.window.showTextDocument(doc))
}
