import type { PositionOption1, PositionOption2 } from './types'
import * as vscode from './vscode-shim'

/**
 * 创建位置
 * @description create position
 * @returns Position
 */
export function createPosition(pos: number, pos1: number, offsetLine?: number, offsetColumn?: number): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1, offsetLine?: number, offsetColumn?: number): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1 | number, pos1?: number, offsetLine: number = 0, offsetColumn: number = 0) {
  return Array.isArray(pos)
    ? new vscode.Position(pos[0] - offsetLine, pos[1] - offsetColumn)
    : typeof pos === 'number'
      ? new vscode.Position(pos - offsetLine, pos1! - offsetColumn)
      : new vscode.Position((pos as PositionOption2).line - (pos1 || 0), ((pos as PositionOption2).character ?? (pos as PositionOption2).column!) - (offsetLine || 0))
}
