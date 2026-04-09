import type * as vscode from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position位置的关键词的range
 */
export function getWordRangeAtPosition(
  position: vscode.Position,
  textEditor: vscode.TextEditor | undefined = getActiveTextEditor(),
): vscode.Range | undefined {
  if (textEditor)
    return textEditor.document.getWordRangeAtPosition(position)
}
