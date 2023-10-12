import * as vscode from 'vscode'
import type { PositionOption1, PositionOption2 } from './types'

export function createRange(start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1) {
  const rangeStart = Array.isArray(start)
    ? new vscode.Position(...start)
    : new vscode.Position((start as PositionOption2).line, (start as PositionOption2).character ?? (start as PositionOption2).column!)
  const rangeEnd = Array.isArray(end)
    ? new vscode.Position(...end)
    : new vscode.Position((end as PositionOption2).line, (end as PositionOption2).character ?? (end as PositionOption2).column!)
  return new vscode.Range(rangeStart, rangeEnd)
}

