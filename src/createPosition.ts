import * as vscode from 'vscode'
import type { PositionOption1, PositionOption2 } from './types'

/**
 * 创建位置
 * @description create position
 * @returns Position
 */
export function createPosition(pos: number, pos1: number): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1): vscode.Position
export function createPosition(pos: PositionOption2 | PositionOption1 | number, pos1?: number) {
  return Array.isArray(pos)
    ? new vscode.Position(...pos)
    : typeof pos === 'number'
      ? new vscode.Position(pos, pos1!)
      : new vscode.Position((pos as PositionOption2).line, (pos as PositionOption2).character ?? (pos as PositionOption2).column!)
}
