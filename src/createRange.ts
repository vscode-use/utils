import * as vscode from 'vscode'
import type { PositionOption1, PositionOption2 } from './types'

export function createRange(start: PositionOption1, end: PositionOption1): vscode.Range
export function createRange(start: PositionOption2, end: PositionOption2): vscode.Range

export function createRange(start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1) {
  return Array.isArray(start) && Array.isArray(end)
    ? new vscode.Range(new vscode.Position(...start), new vscode.Position(...end))
    : new vscode.Range(new vscode.Position((start as PositionOption2).line, (start as PositionOption2).character ?? (start as PositionOption2).column!), new vscode.Position((end as PositionOption2).line, (end as PositionOption2).character ?? (end as PositionOption2).column!))
}
