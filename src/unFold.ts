import type { Range } from 'vscode'
import * as vscode from 'vscode'
export function unFold(rangesToFold: Range[]) {
  rangesToFold.forEach(range =>
    vscode.commands.executeCommand('editor.unfold', {
      selectionLines: [range.start.line, range.end.line],
    }),
  )
}
