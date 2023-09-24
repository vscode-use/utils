import type { Range } from 'vscode'
import * as vscode from 'vscode'
export function onFold(rangesToFold: Range[]) {
  rangesToFold.forEach(range =>
    vscode.commands.executeCommand('editor.fold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
