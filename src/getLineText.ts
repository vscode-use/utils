import type { TextEditor } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取传入行数所在行的文本
 * @param lineNumber 行数
 * @returns 该行文本
 */
export function getLineText(lineNumber: number, textEditor: TextEditor | undefined = getActiveTextEditor()): string | undefined {
  if (textEditor)
    return textEditor.document.lineAt(lineNumber).text
}
