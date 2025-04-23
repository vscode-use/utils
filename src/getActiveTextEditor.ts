import * as vscode from './vscode-shim'
/**
 * 获取激活的编辑器
 */
export function getActiveTextEditor() {
  const activeTextEditor = vscode.window.activeTextEditor
  if (activeTextEditor?.document.fileName === 'exthost')
    return
  return activeTextEditor
}
