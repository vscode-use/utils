import type { BarOptions } from './types'
import * as vscode from './vscode-shim'

/**
 * 创建底部栏
 * @param options {
  position?: 'left' | 'right' // 栏的位置
  offset?: number // 栏的偏移量
  text: string // 栏的文本
  tooltip?: string // 栏的提示
  color?: string | ThemeColor | undefined // 栏的颜色
  backgroundColor?: ThemeColor | undefined // 栏的背景颜色
  command?: string | Command | undefined // 栏的命令
  accessibilityInformation?: AccessibilityInformation | undefined // 栏的辅助信息
}
 * @param options.position 'left' | 'right' 栏的位置
 * @param options.offset number 栏的偏移量
 * @param options.text string 栏的文本
 * @param options.tooltip string 栏的提示
 * @param options.color string | ThemeColor | undefined 栏的颜色
 * @param options.backgroundColor ThemeColor | undefined 栏的背景颜色
 * @param options.command string | Command | undefined 栏的命令
 * @param options.accessibilityInformation AccessibilityInformation | undefined 栏的辅助信息
 * @returns StatusBarItem
 */
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
