import * as vscode from 'vscode'

/**
 * 创建选择框
 * @param options
 * @param quickPickOptions
 * @returns Thenable<string | undefined>
 */
export function createSelect<T extends boolean = false>(
  options: (string | vscode.QuickPickItem)[],
  quickPickOptions?: Partial<vscode.QuickPick<any>>,
): Promise<T extends true ? string[] : string | undefined> {
  return new Promise((resolve) => {
    const noop = () => { }
    const quickPick = vscode.window.createQuickPick()
    const fixedOptions = options.map((item: any) =>
      typeof item === 'string' ? { label: item } : item,
    ) as vscode.QuickPickItem[]

    quickPick.items = fixedOptions
    Object.assign(quickPick, quickPickOptions)

    if (quickPickOptions?.activeItems && quickPick.items.length > 0) {
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
    else if (quickPick.items.length > 0) {
      const presetSelections = fixedOptions.filter((item: any) => item.picked)
      if (presetSelections.length > 0) {
        const quickPickWithSelection = quickPick as vscode.QuickPick<vscode.QuickPickItem> & { selectedItems: vscode.QuickPickItem[] }
        quickPickWithSelection.selectedItems = presetSelections
        quickPick.activeItems = [presetSelections[0]]
      }
      else {
        quickPick.activeItems = [quickPick.items[0]]
      }
    }

    let selection: readonly vscode.QuickPickItem[] = []
    let resolved = false
    const resolveOnce = (value: any) => {
      if (resolved)
        return
      resolved = true
      resolve(value)
    }
    quickPick.onDidChangeSelection((_selection) => {
      selection = _selection
      ; (quickPickOptions?.onDidChange || noop)(_selection)
    })
    quickPick.onDidAccept(() => {
      if (quickPickOptions?.canSelectMany)
        resolveOnce(selection.map(item => item.label) as T extends true ? string[] : string | undefined)
      else
        resolveOnce((selection[0]?.label ?? quickPick.value) as T extends true ? string[] : string | undefined)
      ; (quickPickOptions?.onDidAccept || noop)()
      quickPick.hide()
    })
    quickPick.onDidTriggerButton(quickPickOptions?.onDidTriggerButton || noop)
    quickPick.onDidTriggerItemButton(quickPickOptions?.onDidTriggerItemButton || noop)
    quickPick.onDidChangeActive(quickPickOptions?.onDidChangeActive || noop)
    quickPick.onDidChangeValue(quickPickOptions?.onDidChangeValue || noop)
    quickPick.onDidHide((e) => {
      (quickPickOptions?.onDidHide || noop)(e)
      resolveOnce(undefined)
      quickPick.dispose()
    })
    quickPick.show()
  })
}
