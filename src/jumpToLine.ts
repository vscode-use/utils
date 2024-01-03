import * as vscode from 'vscode'
import { openFile } from './openFile'
import { getCurrentFileUrl } from './getCurrentFileUrl'
import type { PositionOption1 } from './types'
import { createRange } from './createRange'
import { setSelection } from './setSelection'
import { getActiveTextEditor } from './getActiveTextEditor'

/**
 * 跳入某个文件的某一行的位置
 * @param lineNumber 行数或者 range 范围
 * @param filepath 路径 默认使用当前激活的文件
 * @returns
 */
export function jumpToLine(lineNumber: number | PositionOption1 | [PositionOption1, PositionOption1] | vscode.Range, filepath = getCurrentFileUrl()) {
  let range: vscode.Range
  if (typeof lineNumber === 'number') {
    range = createRange([lineNumber, 0], [lineNumber, 0])
  }
  else if (lineNumber instanceof vscode.Range) {
    range = lineNumber
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
  if (filepath)
    return openFile(filepath, { selection: range })
}

/**
 * 跳到当前文件的某一行
 * @param lineNumber 行数
 */
export function toLine(lineNumber: number | [number, number]) {
  let range
  if (Array.isArray(lineNumber))
    range = createRange([lineNumber[0] - 1, lineNumber[1]], [lineNumber[0], 0])
  else
    range = createRange([lineNumber - 1, 0], [lineNumber, 0])
  const editor = getActiveTextEditor()
  if (editor) {
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter)
    setSelection(range.start, range.start)
  }
}
