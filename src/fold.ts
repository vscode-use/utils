import type { Range } from 'vscode'
import * as vscode from 'vscode'
export function fold(rangesToFold: Range[]) {
  return rangesToFold.map(range =>
    vscode.commands.executeCommand('editor.fold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
