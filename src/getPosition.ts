import type { TextEditor } from 'vscode'
import * as vscode from 'vscode'
import { getActiveText } from './getActiveText'

export interface PositionInfo {
  line: number
  column: number
  character: number
  offset: number
  position: vscode.Position
}
/**
 * 根据offset获取行列
 */
export function getPosition(offset: number, content: string): PositionInfo
export function getPosition(offset: number, textEditor?: TextEditor): PositionInfo | undefined
export function getPosition(offset: number, contentOrTextEditor?: string | TextEditor): PositionInfo | undefined {
  const content = typeof contentOrTextEditor === 'string'
    ? contentOrTextEditor
    : getActiveText(contentOrTextEditor)
  if (!content)
    return

  const contents = content.split('\n')
  const max = contents.length
  let num = 0
  let line = 0
  let column = 0
  for (let n = 0; n < max; n++) {
    const cur = num + contents[n].length + (n > 0 ? 1 : 0)
    line = n
    column = offset - num - (n > 0 ? 1 : 0)
    if (num <= offset && cur >= offset)
      break

    num = cur
  }

  column = Math.min(column, contents[line].length)
  return {
    line,
    column,
    character: column,
    offset,
    position: new vscode.Position(line, column),
  }
}
