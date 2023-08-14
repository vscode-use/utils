import * as vscode from 'vscode'
import type { Range, TextEditorDecorationType } from 'vscode'
export function setStyle(decorationType: TextEditorDecorationType, range?: Range) {
  return vscode.window.activeTextEditor!.setDecorations(decorationType, range ? [range] : [])
}
