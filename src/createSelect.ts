import * as vscode from 'vscode'
import type { QuickPickOptions } from 'vscode'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns
 */
export function createSelect<T extends QuickPickOptions>(options: string[], quickPickOptions?: T): Thenable<string | string[] | undefined> {
  return vscode.window.showQuickPick(options, quickPickOptions as T['canPickMany'] extends true ? (QuickPickOptions & { canPickMany: true }) : QuickPickOptions)
}
