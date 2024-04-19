import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取传入行数所在行的文本
 * @param lineNumber 行数
 * @returns 该行文本
 */
export function getLineText(lineNumber: number) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.lineAt(lineNumber).text
}
