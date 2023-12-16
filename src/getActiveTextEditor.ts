import * as vscode from 'vscode'
/**
 * 获取激活的编辑器
 */
export function getActiveTextEditor() {
  return vscode.window.activeTextEditor
}
