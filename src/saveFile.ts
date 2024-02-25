import * as vscode from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
import { nextTick } from './nextTick'

/**
 * 保存文件
 * @description 默认保存当前激活的文件，如果传入true，则保存所有文件
 * @param isAll Boolean default: false
 */
export function saveFile(isAll: Boolean = false) {
  const activeTextEditor = getActiveTextEditor()
  nextTick(() => {
    // 文件已更新,调用保存
    if (isAll)
      vscode.workspace.saveAll()
    else
      activeTextEditor?.document.save()
  })
}
