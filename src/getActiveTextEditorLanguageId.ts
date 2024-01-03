import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的语言
 * @returns
 */
export function getActiveTextEditorLanguageId() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.languageId
}
