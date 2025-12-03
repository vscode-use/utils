import type { Position, TextEditor } from 'vscode'
import { Range, SnippetString } from 'vscode'
import { createRange } from './createRange'
import { createSnippetString } from './createSnippetString'
import { getActiveTextEditor } from './getActiveTextEditor'
import { scrollInToView } from './scrollInToView'

type Location = Position | Range | readonly Position[] | readonly Range[]
type Snippet = string | SnippetString
export interface InsertTextOptions {
  readonly undoStopBefore?: boolean
  readonly undoStopAfter?: boolean
  readonly textEditor?: TextEditor
  readonly scrollInToView?: boolean
}
export async function insertText(snippet: Snippet, location: Location, options?: InsertTextOptions): Promise<boolean>
export async function insertText(location: Location, snippet: Snippet, options?: InsertTextOptions): Promise<boolean>
/**
 * 插入文本或代码片段到指定位置
 * @param {Snippet | Location} snippet - 要插入的文本或代码片段
 * @param {Location | Snippet} location - 插入位置，可以是 Position、Range 或它们的数组
 * @param {object} [options] - 插入选项
 * @param {boolean} [options.undoStopBefore] - 插入前是否创建撤销停止点
 * @param {boolean} [options.undoStopAfter] - 插入后是否创建撤销停止点
 * @param {TextEditor} [options.textEditor] - 指定的文本编辑器，默认为当前激活的编辑器
 * @param {boolean} [options.scrollInToView] - 是否滚动到插入位置
 * @returns {Promise<boolean>} - 插入是否成功
 */
export async function insertText(snippet: Snippet | Location, location: Snippet | Location, options: InsertTextOptions = { undoStopBefore: false, undoStopAfter: false, textEditor: getActiveTextEditor(), scrollInToView: true }) {
  const activeTextEditor = options.textEditor
  if (!activeTextEditor)
    return false

  if (typeof snippet !== 'string' && !(snippet instanceof SnippetString)) {
    const temp = snippet
    snippet = location
    location = temp
  }

  if (typeof snippet === 'string')
    snippet = createSnippetString(snippet)

  const res = await activeTextEditor.insertSnippet(snippet as SnippetString, location as Location, options as { undoStopBefore: boolean, undoStopAfter: boolean })
  if (res && options.scrollInToView && !Array.isArray(location)) {
    scrollInToView(location instanceof Range ? location : createRange(location as Position, location as Position))
  }
  return res
}
