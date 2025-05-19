import type { PositionOption1, PositionOption2 } from './types'
import * as vscode from 'vscode'
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
  if (start instanceof vscode.Position && end instanceof vscode.Position) {
    _start = start
    _end = end
  }
  else if (start instanceof vscode.Position && typeof end === 'number' && typeof v1 === 'number') {
    _start = start
    _end = createPosition(end, v1)
  }
  else if (start instanceof vscode.Position && Array.isArray(end)) {
    _start = start
    _end = createPosition(end)
  }
  else if (typeof start === 'number' && typeof end === 'number' && typeof v1 === 'number' && typeof v2 === 'number') {
    _start = createPosition(start, end)
    _end = createPosition(v1, v2)
  }
  else if (typeof start === 'number' && typeof end === 'number' && Array.isArray(v1)) {
    _start = createPosition(start, end)
    _end = createPosition(v1)
  }
  else if (typeof start === 'number' && typeof end === 'number' && v1 instanceof vscode.Position) {
    _start = createPosition(start, end)
    _end = v1
  }
  else if (Array.isArray(start) && typeof end === 'number' && typeof v1 === 'number') {
    _start = createPosition(start)
    _end = createPosition(end, v1)
  }
  else if (Array.isArray(start) && end instanceof vscode.Position) {
    _start = createPosition(start)
    _end = end
  }
  else if (Array.isArray(start) && Array.isArray(end)) {
    _start = createPosition(start)
    _end = createPosition(end)
  }

  if (_start && _end)
    return new vscode.Range(_start, _end)
  throw new Error('createRange parameter error')
}
