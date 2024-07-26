import type { Position, Range, SnippetString } from 'vscode'
import { getActiveTextEditor } from './getActiveTextEditor'
import { createSnippetString } from './createSnippetString'

/**
 * 插入 {@link SnippetString snippet} 并将编辑器置于片段模式。“片段模式”
 * 表示编辑器添加占位符和附加光标，以便用户可以完成
 * 或接受片段。
 *
 * @param snippet 在此编辑中插入的片段。
 * @param location 插入片段的位置或范围，默认为当前编辑器选择或选择。
 * @param options 此编辑周围的撤消/重做行为。默认情况下，撤消停止将在此编辑之前和之后创建。
 * @param options.undoStopBefore 此编辑周围的撤消/重做行为。默认情况下，撤消停止将在此编辑之前和之后创建。
 * @param options.undoStopAfter 此编辑周围的撤消/重做行为。默认情况下，撤消停止将在此编辑之前和之后创建。
 * @return 一个承诺，以指示是否可以插入片段的值来解析。请注意，承诺不会发出信号
 * 片段已完全填写或被接受。
 */
export function insertText(snippet: string | SnippetString, location?: Position | Range | readonly Position[] | readonly Range[], options?: { readonly undoStopBefore: boolean, readonly undoStopAfter: boolean }) {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return
  if (typeof snippet === 'string')
    snippet = createSnippetString(snippet)

  return activeTextEditor.insertSnippet(snippet, location, options)
}
