import * as vscode from 'vscode'
import type { PositionOption } from './types'

export function createRange(start: PositionOption, end: PositionOption) {
  return new vscode.Range(new vscode.Position(start.line, start.character), new vscode.Position(end.line, end.character))
}
