import type { ClearStyle } from './types'
import type { Range, TextEditorDecorationType } from './vscode-shim'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 设置样式
 * @param decorationType
 * @param range
 * @returns ClearStyle
 */
export function setStyle(decorationType: TextEditorDecorationType, range?: Range | Range[]): ClearStyle | undefined {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return

  const rangeOrOptins = range
    ? Array.isArray(range)
      ? range
      : [range]
    : []
  activeTextEditor.setDecorations(decorationType, rangeOrOptins as Range[])
  return () => activeTextEditor.setDecorations(decorationType, [])
}
