import type { Range } from 'vscode'
import * as vscode from 'vscode'

/**
 * 展开指定的 range
 * @param rangesToFold
 * @returns Thenable<void>[]
 */
export function unFold(rangesToFold: Range[]): Thenable<void>[] {
  return rangesToFold.map(range =>
    vscode.commands.executeCommand<void>('editor.unfold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
