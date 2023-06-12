import * as vscode from 'vscode'
import type { BarOptions } from './types'
/** 底部栏按钮 */
export function createBottomBar(options: BarOptions) {
  const { position = 'left', offset, text, tooltip, color, backgroundColor, accessibilityInformation, command } = options
  const positionMap = {
    left: 1,
    right: 2,
  }
  const statusBarItem = vscode.window.createStatusBarItem(positionMap[position], offset)
  statusBarItem.text = text
  statusBarItem.tooltip = tooltip
  statusBarItem.color = color
  statusBarItem.backgroundColor = backgroundColor
  statusBarItem.accessibilityInformation = accessibilityInformation
  statusBarItem.command = command

  return statusBarItem
}
