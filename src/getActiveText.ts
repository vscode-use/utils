import type { TextEditor } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的文本
 * @returns string | undefined
 */
export function getActiveText(textEditor: TextEditor | undefined = getActiveTextEditor()): string | undefined {
  if (textEditor)
    return textEditor.document.getText()
}
