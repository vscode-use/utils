import type { ISelections } from './types'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'
import * as vscode from './vscode-shim'

/**
 * 设置多个选中区域
 * @param selectionsOptions
 */
export function setSelections(selectionsOptions: ISelections) {
  const selections = selectionsOptions.map(({ start, end, position }) => {
    const range = createRange(start, end)
    const selection = (position || 'right') === 'left'
      ? new vscode.Selection(range.end, range.start)
      : new vscode.Selection(range.start, range.end)
    return selection
  })
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    activeTextEditor.selections = selections
}
