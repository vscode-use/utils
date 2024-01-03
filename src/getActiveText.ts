import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的文本
 * @returns
 */
export function getActiveText() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.getText()
}
