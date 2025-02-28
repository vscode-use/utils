import type { Position } from 'vscode'
import { Range, SnippetString } from 'vscode'
import { createRange } from './createRange'
import { createSnippetString } from './createSnippetString'
import { getActiveTextEditor } from './getActiveTextEditor'
import { scrollInToView } from './scrollInToView'

type Location = Position | Range | readonly Position[] | readonly Range[]
type Snippet = string | SnippetString
export async function insertText(snippet: Snippet, location: Location, options?: { readonly undoStopBefore: boolean, readonly undoStopAfter: boolean }): Promise<boolean>
export async function insertText(location: Location, snippet: Snippet, options?: { readonly undoStopBefore: boolean, readonly undoStopAfter: boolean }): Promise<boolean>
/**
 * 插入文本或代码片段到指定位置
 * @param {Snippet | Location} snippet - 要插入的文本或代码片段
 * @param {Location | Snippet} location - 插入位置，可以是 Position、Range 或它们的数组
 * @param {object} [options] - 插入选项
 * @param {boolean} [options.undoStopBefore] - 插入前是否创建撤销停止点
 * @param {boolean} [options.undoStopAfter] - 插入后是否创建撤销停止点
 * @returns {Promise<boolean>} - 插入是否成功
 */
export async function insertText(snippet: Snippet | Location, location: Snippet | Location, options?: { readonly undoStopBefore: boolean, readonly undoStopAfter: boolean }) {
  const activeTextEditor = getActiveTextEditor()
  if (!activeTextEditor)
    return

  if (typeof snippet !== 'string' && !(snippet instanceof SnippetString)) {
    const temp = snippet
    snippet = location
    location = temp
  }

  if (typeof snippet === 'string')
    snippet = createSnippetString(snippet)

  const res = await activeTextEditor.insertSnippet(snippet as SnippetString, location as Location, options ?? {
    undoStopBefore: false,
    undoStopAfter: false,
  })
  if (res && !Array.isArray(location)) {
    scrollInToView(location instanceof Range ? location : createRange(location as Position, location as Position))
  }
  return res
}
