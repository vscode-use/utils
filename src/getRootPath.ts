import type { TextEditor, Uri } from 'vscode'
import { workspace } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
/**
 * 获取当前工作区的根目录
 * @returns string | Uri | undefined
 */
export function getRootPath<T extends boolean = false>(isUri?: T, textEditor: TextEditor | undefined = getActiveTextEditor()): undefined | (T extends true ? Uri : string) {
  const activeEditor = textEditor
  if (workspace.workspaceFolders && activeEditor) {
    const activeFolder = workspace.getWorkspaceFolder(activeEditor.document.uri)
    if (activeFolder) {
      return (isUri
        ? activeFolder.uri
        : activeFolder.uri.fsPath) as T extends true ? Uri : string
    }
  }
}
