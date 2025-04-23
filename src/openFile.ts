import type { TextDocumentShowOptions, TextEditor } from './vscode-shim'
import * as vscode from './vscode-shim'

/**
 * 打开文件
 * @param fileUri 文件路径
 * @param showOptions 参数控制在哪一个窗口打开，比如侧边栏，是否需要选中某一个区域等
 * @returns Promise<TextEditor>
 */
export function openFile(fileUri: string, showOptions?: TextDocumentShowOptions): Promise<TextEditor> {
  return new Promise((resolve) => {
    vscode.workspace
      .openTextDocument(fileUri)
      .then(doc => vscode.window.showTextDocument(doc, showOptions).then(resolve))
  })
}
