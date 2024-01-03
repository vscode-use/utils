import type { TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 操作当前激活文件的数据比如更新、替换、新增等
 * @param callback
 */
export function updateText(callback: (editBuilder: TextEditorEdit) => void) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    activeTextEditor.edit(callback)
}
