import * as vscode from 'vscode'
/**
 * 获取激活的编辑器
 */
export function getActiveTextEditor(): vscode.TextEditor | undefined {
  const activeTextEditor = vscode.window.activeTextEditor
  if (activeTextEditor?.document.fileName === 'exthost')
    return
  return activeTextEditor
}
