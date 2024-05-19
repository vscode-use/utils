import type { AccessibilityInformation, ColorTheme, Command, ConfigurationChangeEvent, FileCreateEvent, FileDeleteEvent, FileRenameEvent, InputBoxValidationMessage, ProgressLocation, QuickInputButton, QuickPickItem, Terminal, TextDocument, TextDocumentChangeEvent, TextEditor, TextEditorSelectionChangeEvent, TextEditorViewColumnChangeEvent, TextEditorVisibleRangesChangeEvent, ThemeColor, Uri, WorkspaceFoldersChangeEvent } from 'vscode'

export interface MessageOption {
  message: string
  type?: 'info' | 'error' | 'warn'
  buttons?: string[] | string
  modal?: boolean
  detail?: string
}

export interface EventCallbackMap {
  'terminal-close': (terminal: Terminal) => void
  'terminal-open': (terminal: Terminal) => void
  'terminal-change': (terminal: Terminal) => void
  'theme-change': (colorTheme: ColorTheme) => void
  'selection-change': (e: TextEditorSelectionChangeEvent) => void
  'editor-visible': (editors: TextEditor[]) => void
  'activeText-change': (editor: TextEditor | undefined) => void
  'text-visible-change': (e: TextEditorVisibleRangesChangeEvent) => void
  'text-column-change': (e: TextEditorViewColumnChangeEvent) => void
}
export interface WorkspaceCallbackMap {
  'text-change': (e: TextDocumentChangeEvent) => void
  'text-open': (doc: TextDocument) => void
  'text-save': (doc: TextDocument) => void
  'folder-change': (e: WorkspaceFoldersChangeEvent) => void
  'file-create': (e: FileCreateEvent) => void
  'file-delete': (e: FileDeleteEvent) => void
  'rename': (e: FileRenameEvent) => void
  'config-change': (e: ConfigurationChangeEvent) => void
  'text-close': (doc: TextDocument) => void
}

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

export type ISelections = { start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1, position?: 'left' | 'right' }[]

export type ClearStyle = () => void

export interface quickPickOptions {
  canSelectMany?: boolean
  title?: string
  value?: string
  placeholder?: string
  buttons?: QuickInputButton[]
  matchOnDescription?: boolean
  keepScrollPosition?: boolean
  activeItems?: QuickPickItem[]
}
