import type { quickPickOptions } from './types'
import * as vscode from 'vscode'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns Thenable<string | undefined>
 */
export function createSelect<T extends quickPickOptions>(options: string[] | vscode.QuickPickItem[], quickPickOptions?: T): any {
  return new Promise((resolve) => {
    const noop = () => { }
    const quickPick = vscode.window.createQuickPick()
    if (typeof options[0] === 'string')
      options = (options as string[]).map(label => ({ label }))

    quickPick.items = options as vscode.QuickPickItem[] // options 是你的选项数组
    if (quickPickOptions) {
      quickPick.canSelectMany = quickPickOptions.canSelectMany || false
      quickPick.title = quickPickOptions.title || ''
      quickPick.value = quickPickOptions.value || ''
      quickPick.placeholder = quickPickOptions.placeholder || ''
      quickPick.buttons = quickPickOptions.buttons || []
      quickPick.matchOnDescription = quickPickOptions.matchOnDescription || false
      quickPick.keepScrollPosition = quickPickOptions.keepScrollPosition || false
    }

    if (quickPickOptions?.activeItems) {
      let activeItem = quickPick.items[0]
      quickPickOptions.activeItems.find((item) => {
        const target = quickPick.items.find(i => i.label === item)
        if (target) {
          activeItem = target
          return true
        }
        return false
      })
      quickPick.activeItems = [activeItem]
    }
    else {
      quickPick.selectedItems = (options as vscode.QuickPickItem[]).filter((item: any) => item.picked)
      quickPick.activeItems = [quickPick.items[0]]
    }
    let selection: readonly vscode.QuickPickItem[]
    quickPick.onDidChangeSelection((_selection) => {
      selection = _selection
      ; (quickPickOptions?.onDidChange || noop)(_selection)
    })
    quickPick.onDidAccept(() => {
      if (quickPickOptions?.canSelectMany)
        resolve(selection.map(item => item.label) as any)
      else
        resolve(selection[0]?.label as any)
      ; (quickPickOptions?.onDidAccept || noop)()
      quickPick.hide()
    })
    quickPick.onDidTriggerButton(quickPickOptions?.onDidTriggerButton || noop)
    quickPick.onDidTriggerItemButton(quickPickOptions?.onDidTriggerItemButton || noop)
    quickPick.onDidChangeActive(quickPickOptions?.onDidChangeActive || noop)
    quickPick.onDidChangeValue(quickPickOptions?.onDidChangeValue || noop)
    quickPick.onDidHide((e) => {
      (quickPickOptions?.onDidHide || noop)(e)
      quickPick.dispose()
    })
    quickPick.show()
  }) as any
}
