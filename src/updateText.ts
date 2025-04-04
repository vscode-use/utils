import type { TextEditor, TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 操作当前激活文件的数据比如更新、替换、新增等
 * @param callback
 */
export function updateText(callback: (editBuilder: TextEditorEdit) => void, options: {
  /**
   * Add undo stop before making the edits.
   */
  readonly undoStopBefore: boolean
  /**
   * Add undo stop after making the edits.
   */
  readonly undoStopAfter: boolean
  /**
   * The active text editor.
   */
  readonly textEditor?: TextEditor
} = { undoStopBefore: false, undoStopAfter: false, textEditor: getActiveTextEditor() }) {
  const activeTextEditor = options.textEditor
  if (activeTextEditor)
    return activeTextEditor.edit(callback, options)

  return Promise.resolve(false)
}
