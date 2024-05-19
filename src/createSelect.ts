import * as vscode from 'vscode'
import type { quickPickOptions } from './types'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns Thenable<string | undefined>
 */
export function createSelect<T extends quickPickOptions>(options: string[] | vscode.QuickPickItem[], quickPickOptions?: T): T['canSelectMany'] extends true ? Thenable<string[] | undefined> : Thenable<string | undefined> {
  return new Promise((resolve) => {
    const quickPick = vscode.window.createQuickPick()
    if (typeof options[0] === 'string')
      options = (options as string[]).map(label => ({ label }))

    quickPick.items = options as vscode.QuickPickItem[] // options 是你的选项数组

    if (quickPickOptions?.activeItems)
      quickPick.activeItems = quickPickOptions.activeItems
    else
      quickPick.activeItems = options.filter((item: any) => item?.picked) as vscode.QuickPickItem[]

    quickPick.onDidChangeSelection((selection) => {
      if (quickPickOptions?.canSelectMany)
        resolve(selection.map(item => item.label) as any)
      else
        resolve(selection[0]?.label as any)
    })
    quickPick.show()
  }) as T['canSelectMany'] extends true ? Thenable<string[] | undefined> : Thenable<string | undefined>
}
