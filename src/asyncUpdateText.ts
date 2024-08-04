import type { TextEditorEdit } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 操作当前激活文件的数据比如更新、替换、新增等
 * @param callback
 */
export function asyncUpdateText(callback: (editBuilder: TextEditorEdit) => void) {
  return new Promise((resolve, reject) => {
    const activeTextEditor = getActiveTextEditor()
    if (activeTextEditor) {
      activeTextEditor.edit((edit) => {
        callback(edit)
        resolve(true)
      })
    }
    else {
      reject(new Error('activeTextEditor is undefined'))
    }
  })
}
