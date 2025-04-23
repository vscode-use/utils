import type * as vscode from './vscode-shim'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position位置的关键词的range
 */
export function getWordRangeAtPosition(position: vscode.Position) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.getWordRangeAtPosition(position)
}
