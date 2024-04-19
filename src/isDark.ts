import * as vscode from 'vscode'

/**
 * 判断当前主题色
 * 如果主题色不是light就判断是dark
 * @returns boolean
 */
export function isDark(): boolean {
  const colorTheme = vscode.workspace.getConfiguration('workbench').get<string>('colorTheme')!
  return !colorTheme.toLowerCase().includes('light')
}
