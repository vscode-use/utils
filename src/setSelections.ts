import type { TextEditor } from 'vscode'
import type { ISelections } from './types'
import * as vscode from 'vscode'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 设置多个选中区域
 * @param selectionsOptions
 */
export function setSelections(
  selectionsOptions: ISelections,
  textEditor: TextEditor | undefined = getActiveTextEditor(),
): void {
  const selections = selectionsOptions.map(({ start, end, position }) => {
    const range = createRange(start, end)
    const selection = (position || 'right') === 'left'
      ? new vscode.Selection(range.end, range.start)
      : new vscode.Selection(range.start, range.end)
    return selection
  })
  if (textEditor)
    textEditor.selections = selections
}
