import type { PositionOption1, PositionOption2 } from './types'
import * as vscode from 'vscode'

/**
 * 创建位置
 * @description create position
 * @returns Position
 */
export function createPosition(pos: number, pos1: number, offsetLine?: number, offsetColumn?: number): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1, offsetLine?: number, offsetColumn?: number): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1 | number, pos1?: number, offsetLine: number = 0, offsetColumn: number = 0) {
  if (Array.isArray(pos))
    return new vscode.Position(pos[0] - offsetLine, pos[1] - offsetColumn)

  if (typeof pos === 'number')
    return new vscode.Position(pos - offsetLine, pos1! - offsetColumn)

  const columnArgProvided = arguments.length >= 4
  const lineOffset = typeof pos1 === 'number' ? pos1 : 0
  const columnOffset = columnArgProvided ? offsetColumn : offsetLine || 0
  return new vscode.Position((pos as PositionOption2).line - lineOffset, ((pos as PositionOption2).character ?? (pos as PositionOption2).column!) - columnOffset)
}
