import type { TextDocumentShowOptions, TextEditor } from 'vscode'
import * as vscode from 'vscode'

export type OpenFileOptions = TextDocumentShowOptions

/**
 * 打开文件
 * @param fileUri 文件路径
 * @param showOptions OpenFileOptions 参数控制在哪一个窗口打开，比如侧边栏，是否需要选中某一个区域等
 * @returns Thenable<TextEditor>
 */
export function openFile(fileUri: string, showOptions?: OpenFileOptions): Thenable<TextEditor> {
  return vscode.workspace
    .openTextDocument(fileUri)
    .then(doc => vscode.window.showTextDocument(doc, showOptions))
}
