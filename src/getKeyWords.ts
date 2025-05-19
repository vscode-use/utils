import type * as vscode from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position获取关键词
 */
export function getKeyWords(position: vscode.Position) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.getText(activeTextEditor.document.getWordRangeAtPosition(position))
}
