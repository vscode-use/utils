import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的路径
 * @returns
 */
export function getCurrentFileUrl() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.uri.fsPath
}
