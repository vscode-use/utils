import * as vscode from 'vscode'

/**
 * 判断当前主题色
 * @returns boolean
 */
export function isDark(): boolean {
  return vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark
}
