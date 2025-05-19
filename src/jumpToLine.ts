import type { PositionOption1 } from './types'
import * as vscode from 'vscode'
import { createRange } from './createRange'
import { getActiveTextEditor } from './getActiveTextEditor'
import { getCurrentFileUrl } from './getCurrentFileUrl'
import { openFile } from './openFile'
import { setSelection } from './setSelection'

/**
 * 跳入某个文件的某一行的位置
 * @param lineNumber 行数或者 range 范围
 * @param filepath 路径 默认使用当前激活的文件
 * @returns Promise<TextEditor>
 */
export function jumpToLine(lineNumber: number | PositionOption1 | [PositionOption1, PositionOption1] | vscode.Range | vscode.Position, filepath = getCurrentFileUrl()) {
  let range: vscode.Range
  if (typeof lineNumber === 'number') {
    range = createRange([lineNumber, 0], [lineNumber, 0])
  }
  else if (lineNumber instanceof vscode.Range) {
    range = lineNumber
  }
  else if (lineNumber instanceof vscode.Position) {
    range = createRange(lineNumber, lineNumber)
  }
  else if (Array.isArray(lineNumber)) {
    if (typeof lineNumber[0] === 'number') {
      const _lineNumber = lineNumber as PositionOption1
      range = createRange(_lineNumber, _lineNumber)
    }
    else {
      const _lineNumber = lineNumber as [PositionOption1, PositionOption1]
      range = createRange(_lineNumber[0], _lineNumber[1])
    }
  }
  else {
    range = createRange([0, 0], [0, 0])
  }
  if (filepath === getCurrentFileUrl()) {
    return toLine(range)
  }
  return openFile(filepath as string, { selection: range })
}

/**
 * 跳到当前文件的某一行
 * @param lineNumber 行数
 */
export function toLine(lineNumber: number | [number, number] | vscode.Range) {
  let range
  if (lineNumber instanceof vscode.Range) {
    range = lineNumber
  }
  else if (Array.isArray(lineNumber)) {
    range = createRange([lineNumber[0] - 1, lineNumber[1]], [lineNumber[0], 0])
  }
  else {
    range = createRange([lineNumber - 1, 0], [lineNumber, 0])
  }
  const editor = getActiveTextEditor()
  if (editor) {
    setSelection(range.start, range.end)
  }
}
