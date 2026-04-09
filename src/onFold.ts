import type { Range } from 'vscode'
import * as vscode from 'vscode'
/**
 * 折叠指定的 range
 * @param rangesToFold Range[] 需要被折叠的 range
 * @returns Thenable<void>[]
 */
export function onFold(rangesToFold: Range[]): Thenable<void>[] {
  return rangesToFold.map(range =>
    vscode.commands.executeCommand<void>('editor.fold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
