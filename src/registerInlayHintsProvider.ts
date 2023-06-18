import * as vscode from 'vscode'
import type { DocumentSelector } from 'vscode'

export function registerInlayHintsProvider(filter: DocumentSelector, callback: (document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken) => vscode.ProviderResult<vscode.InlayHint[]>) {
  class MyInlayHintsProvider implements vscode.InlayHintsProvider {
    provideInlayHints(document: vscode.TextDocument, range: vscode.Range, token: vscode.CancellationToken): vscode.ProviderResult<vscode.InlayHint[]> {
      return callback(document, range, token)
    }
  }
  return vscode.languages.registerInlayHintsProvider(filter, new MyInlayHintsProvider())
}
