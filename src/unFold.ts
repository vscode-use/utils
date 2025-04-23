import type { Range } from './vscode-shim'
import * as vscode from './vscode-shim'

/**
 * 展开指定的 range
 * @param rangesToFold
 * @returns unknown[]
 */
export function unFold(rangesToFold: Range[]) {
  return rangesToFold.map(range =>
    vscode.commands.executeCommand('editor.unfold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
