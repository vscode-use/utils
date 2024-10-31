import type { Uri } from 'vscode'
import { workspace } from 'vscode'
/**
 * 获取当前工作区的根目录
 * @returns 返回当前工作区的根目录
 */
export function getRootPath<T extends boolean = false>(isUri?: T): undefined | (T extends true ? Uri : string) {
  if (workspace.workspaceFolders) {
    return (isUri
      ? workspace.workspaceFolders[0].uri
      : workspace.workspaceFolders[0].uri.fsPath) as any
  }
}
