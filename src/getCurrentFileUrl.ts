import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的路径
 * @returns
 */
export function getCurrentFileUrl(isUri = false) {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return
  return isUri
    ? activeTextEditor.document.uri
    : activeTextEditor.document.uri.fsPath
}
