import * as vscode from 'vscode'
import type { PositionOption1, PositionOption2 } from './types'
import { createPosition } from './createPosition'

/**
 * 创建一个 range
 */
export function createRange(startLine: number, startChar: number, endLine: number, endChar: number): vscode.Range
export function createRange(startLine: number, startChar: number, end: PositionOption2 | PositionOption1 | vscode.Position): vscode.Range
export function createRange(start: PositionOption2 | PositionOption1 | vscode.Position, endLine: number, endChar: number): vscode.Range
export function createRange(start: PositionOption2 | PositionOption1 | vscode.Position, end: PositionOption2 | PositionOption1 | vscode.Position): vscode.Range
export function createRange(start: PositionOption2 | PositionOption1 | number, end: PositionOption2 | PositionOption1 | number, v1?: PositionOption2 | PositionOption1 | number, v2?: number) {
  let _start!: vscode.Position
  let _end!: vscode.Position
  if (start instanceof vscode.Position)
    _start = start
  else if (typeof start === 'number' && typeof end === 'number')
    _start = createPosition(start, end)
  else if (Array.isArray(start))
    _start = createPosition(start)
  else if (typeof start === 'object')
    _start = createPosition(start.line, start.character ?? start.column!)
  if (end instanceof vscode.Position)
    _end = end
  else if (Array.isArray(end))
    _end = createPosition(end)
  else if (typeof v1 === 'number' && typeof v2 === 'number')
    _end = createPosition(v1, v2)
  else if (Array.isArray(v1))
    _end = createPosition(v1)
  else if (typeof end === 'object')
    _end = createPosition(end.line, end.character ?? end.column!)

  if (_start && _end)
    return new vscode.Range(_start, _end)
  throw new Error('createRange parameter error')
}
