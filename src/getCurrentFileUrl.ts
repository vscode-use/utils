import type { Uri } from './vscode-shim'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的路径
 * @returns string
 */
export function getCurrentFileUrl<T extends boolean = false>(isUri?: T): undefined | (T extends true ? Uri : string) {
  const activeTextEditor = getActiveTextEditor()

  if (!activeTextEditor)
    return
  return (isUri
    ? activeTextEditor.document.uri
    : activeTextEditor.document.uri.fsPath) as any
}
