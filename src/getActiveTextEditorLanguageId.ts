import type { TextEditor } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的语言
 * @returns string | undefined
 */
export function getActiveTextEditorLanguageId(textEditor: TextEditor | undefined = getActiveTextEditor()): string | undefined {
  if (textEditor)
    return textEditor.document.languageId
}
