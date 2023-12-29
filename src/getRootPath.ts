import { workspace } from 'vscode'
/**
 * 获取当前工作区的根目录
 * @returns 返回当前工作区的根目录
 */
export function getRootPath() {
  if (workspace.workspaceFolders)
    return workspace.workspaceFolders[0].uri.fsPath
}
