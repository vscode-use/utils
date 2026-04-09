import type { TextEditor, Uri } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 获取当前激活文件的路径
 * @returns string | Uri | undefined
 */
export function getCurrentFileUrl<T extends boolean = false>(isUri?: T, textEditor: TextEditor | undefined = getActiveTextEditor()): undefined | (T extends true ? Uri : string) {
  const activeTextEditor = textEditor

  if (!activeTextEditor)
    return
  return (isUri
    ? activeTextEditor.document.uri
    : activeTextEditor.document.uri.fsPath) as T extends true ? Uri : string
}
