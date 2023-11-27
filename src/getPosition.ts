import * as vscode from 'vscode'
import { getActiveText } from './getActiveText'
/**
 * 根据offset获取行列
 */
export function getPosition(offset: number, content: string = getActiveText()!) {
  const contents = content.split('\n')
  const max = contents.length
  let num = 0
  let line = 0
  let column = 0
  for (let n = 0; n < max; n++) {
    const cur = num + contents[n].length + (n > 0 ? 1 : 0)
    if (num <= offset && cur >= offset) {
      line = n
      column = offset - num
      break
    }

    num = cur
  }
  return {
    line,
    column,
    character: column,
    position: new vscode.Position(line, column),
  }
}
