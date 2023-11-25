import * as vscode from 'vscode'
import { createRange } from './createRange'
import type { PositionOption1, PositionOption2 } from './types'

type ISelections = { start: PositionOption2 | PositionOption1; end: PositionOption2 | PositionOption1; position?: 'left' | 'right' }[]

export function setSelections(selectionsOptions: ISelections) {
  const selections = selectionsOptions.map(({ start, end, position }) => {
    const range = createRange(start, end)
    const selection = (position || 'right') === 'left'
      ? new vscode.Selection(range.end, range.start)
      : new vscode.Selection(range.start, range.end)
    return selection
  })
  const editor = vscode.window.activeTextEditor!
  editor.selections = selections
}
