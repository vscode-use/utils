import type { TextEditor, TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 操作当前激活文件的数据比如更新、替换、新增等
 * @param callback 回调函数，接收一个 TextEditorEdit 对象作为参数
 * @param options 可选参数对象
 * @param options.undoStopBefore 添加撤销停止点
 * @param options.undoStopAfter 添加撤销停止点
 * @param options.textEditor 指定的文本编辑器，默认为当前激活的编辑器
 * @returns Promise<boolean>
 */
export function updateText(callback: (editBuilder: TextEditorEdit) => void, options: {
  /**
   * Add undo stop before making the edits.
   */
  readonly undoStopBefore?: boolean
  /**
   * Add undo stop after making the edits.
   */
  readonly undoStopAfter?: boolean
  /**
   * The active text editor.
   */
  readonly textEditor?: TextEditor
} = { undoStopBefore: false, undoStopAfter: false, textEditor: getActiveTextEditor() }) {
  const activeTextEditor = options.textEditor
  if (activeTextEditor)
    return activeTextEditor.edit(callback, options as { undoStopBefore: boolean, undoStopAfter: boolean })

  return Promise.resolve(false)
}
