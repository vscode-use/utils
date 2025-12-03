import type { Uri } from 'vscode'
import { workspace } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 获取当前工作区的根目录
 * @returns 返回当前工作区的根目录
 */
export function getRootPath<T extends boolean = false>(isUri?: T): undefined | (T extends true ? Uri : string) {
  const activeEditor = getActiveTextEditor()
  if (workspace.workspaceFolders && activeEditor) {
    const activeFolder = workspace.getWorkspaceFolder(activeEditor.document.uri)
    if (activeFolder) {
      return (isUri
        ? activeFolder.uri
        : activeFolder.uri.fsPath) as T extends true ? Uri : string
    }
  }
}
