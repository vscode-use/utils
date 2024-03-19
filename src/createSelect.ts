import * as vscode from 'vscode'
import type { QuickPickOptions } from 'vscode'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns
 */
export function createSelect<T extends QuickPickOptions>(options: string[], quickPickOptions?: T): T['canPickMany'] extends true ? Thenable<string[] | undefined> : Thenable<string | undefined> {
  return vscode.window.showQuickPick(options, quickPickOptions) as any
}
