import type { QuickPickOptions } from './types'
import * as vscode from 'vscode'

export type SelectOption = string | vscode.QuickPickItem

/**
 * 创建选择框
 * @param options SelectOption[]
 * @param quickPickOptions
 * @returns Promise<string | string[] | undefined>
 */
export function createSelect(
  options: SelectOption[],
  quickPickOptions: QuickPickOptions & { canSelectMany: true },
): Promise<string[] | undefined>
export function createSelect(
  options: SelectOption[],
  quickPickOptions?: QuickPickOptions,
): Promise<string | undefined>
export function createSelect(
  options: SelectOption[],
  quickPickOptions?: QuickPickOptions,
): Promise<string[] | string | undefined> {
  return new Promise((resolve) => {
    const noop = () => undefined
    const quickPick = vscode.window.createQuickPick<vscode.QuickPickItem>()
    const fixedOptions = options.map(item =>
      typeof item === 'string' ? { label: item } : item,
    )

    quickPick.items = fixedOptions
    const {
      onDidChange,
      onDidAccept,
      onDidTriggerButton,
      onDidTriggerItemButton,
      onDidChangeActive,
      onDidChangeValue,
      onDidHide,
      ...quickPickProps
    } = quickPickOptions ?? {}
    Object.assign(quickPick, quickPickProps)

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
      const presetSelections = fixedOptions.filter(item => (item as vscode.QuickPickItem & { picked?: boolean }).picked)
      if (presetSelections.length > 0) {
        const quickPickWithSelection = quickPick as vscode.QuickPick<vscode.QuickPickItem> & { selectedItems: vscode.QuickPickItem[] }
        quickPickWithSelection.selectedItems = presetSelections
        quickPick.activeItems = [presetSelections[0]]
      }
      else {
        quickPick.activeItems = [quickPick.items[0]]
      }
    }

    let resolved = false
    const resolveOnce = (value: string[] | string | undefined) => {
      if (resolved)
        return
      resolved = true
      resolve(value)
    }
    quickPick.onDidChangeSelection((_selection) => {
      ;(onDidChange || noop)(_selection)
    })
    quickPick.onDidAccept(() => {
      if (quickPick.canSelectMany)
        resolveOnce(quickPick.selectedItems.map(item => item.label))
      else
        resolveOnce((quickPick.selectedItems[0] ?? quickPick.activeItems[0])?.label ?? quickPick.value)
      ;(onDidAccept || noop)()
      quickPick.hide()
    })
    quickPick.onDidTriggerButton(onDidTriggerButton || noop)
    quickPick.onDidTriggerItemButton(onDidTriggerItemButton || noop)
    quickPick.onDidChangeActive(onDidChangeActive || noop)
    quickPick.onDidChangeValue(onDidChangeValue || noop)
    quickPick.onDidHide(() => {
      ;(onDidHide || noop)()
      resolveOnce(undefined)
      quickPick.dispose()
    })
    quickPick.show()
  })
}
