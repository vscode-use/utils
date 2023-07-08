import * as vscode from 'vscode'
import type { QuickPickOptions } from 'vscode'

export function createSelect(options: string[], quickPickOptions?: QuickPickOptions) {
  return vscode.window.showQuickPick(options, quickPickOptions)
}
