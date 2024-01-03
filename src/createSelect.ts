import * as vscode from 'vscode'
import type { QuickPickOptions } from 'vscode'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns
 */
export function createSelect(options: string[], quickPickOptions?: QuickPickOptions) {
  return vscode.window.showQuickPick(options, quickPickOptions)
}
