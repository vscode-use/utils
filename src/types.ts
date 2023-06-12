import type { AccessibilityInformation, Command, ThemeColor } from 'vscode'

export interface MessageOption {
  message: string
  type?: 'info' | 'error'
  buttons?: string[] | string
}

export type EventType =
| 'terminal-close'
| 'terminal-open'
| 'terminal-change'
| 'theme-change'
| 'selection-change'
| 'editor-visible'
| 'activeText-change'
| 'text-visible-change'
| 'text-change'
| 'text-open'
| 'text-save'
| 'folder-change'
| 'file-create'
| 'file-delete'
| 'rename'

export interface BarOptions {
  position?: 'left' | 'right'
  offset?: number
  text: string
  tooltip?: string
  color?: string | ThemeColor | undefined
  backgroundColor?: ThemeColor | undefined
  command?: string | Command | undefined
  accessibilityInformation?: AccessibilityInformation | undefined
}
