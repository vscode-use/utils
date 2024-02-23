import type { Range, TextEditorDecorationType } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 设置样式
 * @param decorationType
 * @param range
 * @returns
 */
export function setStyle(decorationType: TextEditorDecorationType, range?: Range | Range[]) {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return

  const rangeOrOptins = range
    ? (range as any)?.length
        ? range
        : [range]
    : []
  return activeTextEditor.setDecorations(decorationType, rangeOrOptins as Range[])
}
