import type { Range, TextEditor, TextEditorDecorationType } from 'vscode'
import type { ClearStyle } from './types'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 设置样式
 * @param decorationType
 * @param range
 * @returns ClearStyle
 */
export function setStyle(decorationType: TextEditorDecorationType, range?: Range | Range[], textEditor: TextEditor | undefined = getActiveTextEditor()): ClearStyle | undefined {
  if (!textEditor)
    return

  const rangeOrOptins = range
    ? Array.isArray(range)
      ? range
      : [range]
    : []
  textEditor.setDecorations(decorationType, rangeOrOptins as Range[])
  return () => textEditor.setDecorations(decorationType, [])
}
