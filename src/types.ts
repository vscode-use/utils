import type { AccessibilityInformation, Command, InputBoxValidationMessage, ProgressLocation, ThemeColor, Uri } from 'vscode'

export interface MessageOption {
  message: string
  type?: 'info' | 'error' | 'warn'
  buttons?: string[] | string
  modal?: boolean
  detail?: string
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
  | 'text-close'
  | 'folder-change'
  | 'file-create'
  | 'file-delete'
  | 'rename'
  | 'config-change'
  | 'auth-change'

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

export interface ProgressOptions {
  title: string
  location?: ProgressLocation.Notification | ProgressLocation.Window | ProgressLocation.SourceControl
  cancellable?: boolean
  cancel?: () => void
  done: (report: ProgressReport) => Promise<void>
}
export type ProgressReport = (value: {
  message?: string | undefined
  increment?: number | undefined
}) => void

export type PositionOption1 = [number, number]
export type PositionOption2 = {
  line: number
  character?: number
  column: number
  [key: string]: any
} | {
  line: number
  character: number
  column?: number
  [key: string]: any
}

export interface WatchFilesOptions {
  onChange?: (e: Uri) => any
  onDelete?: (e: Uri) => any
  ignoreCreateEvents?: boolean
  ignoreChangeEvents?: boolean
  ignoreDeleteEvents?: boolean
}

export interface RangeLoc {
  start: PositionOption2
  end: PositionOption2
  [key: string]: any
}

export interface CreateInputOptions {
  ignoreFocusOut?: boolean
  password?: boolean
  prompt?: string
  title?: string
  value: string
  selection?: [number, number]
  placeHolder?: string
  validate?: (value: string) => string | InputBoxValidationMessage | undefined | null |
  Thenable<string | InputBoxValidationMessage | undefined | null>
}

export type ISelections = { start: PositionOption2 | PositionOption1; end: PositionOption2 | PositionOption1; position?: 'left' | 'right' }[]
