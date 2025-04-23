import type { Range } from './vscode-shim'
import * as vscode from './vscode-shim'
/**
 * 折叠指定的 range
 * @param rangesToFold Range[] 需要被折叠的 range
 * @returns Promise<void>[]
 */
export function onFold(rangesToFold: Range[]) {
  return rangesToFold.map(range =>
    vscode.commands.executeCommand('editor.fold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
