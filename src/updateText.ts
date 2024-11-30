import type { TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 操作当前激活文件的数据比如更新、替换、新增等
 * @param callback
 */
export function updateText(callback: (editBuilder: TextEditorEdit) => void, options?: {
  /**
   * Add undo stop before making the edits.
   */
  readonly undoStopBefore: boolean
  /**
   * Add undo stop after making the edits.
   */
  readonly undoStopAfter: boolean
}) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.edit(callback, options)

  return Promise.resolve(false)
}
