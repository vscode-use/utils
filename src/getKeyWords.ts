import type * as vscode from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 根据position获取关键词
 */
export function getKeyWords(position: vscode.Position, textEditor: vscode.TextEditor | undefined = getActiveTextEditor()): string | undefined {
  if (textEditor)
    return textEditor.document.getText(textEditor.document.getWordRangeAtPosition(position))
}
