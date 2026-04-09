import type { AccessibilityInformation, ColorTheme, Command, ConfigurationChangeEvent, Disposable, FileCreateEvent, FileDeleteEvent, FileRenameEvent, InputBoxValidationMessage, ProgressLocation, QuickInputButton, QuickPickItem, QuickPickItemButtonEvent, Terminal, TextDocument, TextDocumentChangeEvent, TextEditor, TextEditorSelectionChangeEvent, TextEditorViewColumnChangeEvent, TextEditorVisibleRangesChangeEvent, ThemeColor, Uri, MessageOptions as VSCodeMessageOptions, WindowState, WorkspaceFoldersChangeEvent } from 'vscode'

export interface MessageOption<T extends string = string> extends VSCodeMessageOptions {
  message: string
  type?: 'info' | 'error' | 'warn'
  buttons?: readonly T[] | T
}

export type MessageInput<T extends string = string> = string | Omit<MessageOption<T>, 'type'>

export interface EventCallbackMap {
  'terminal-close': (terminal: Terminal) => void
  'terminal-open': (terminal: Terminal) => void
  'terminal-change': (terminal: Terminal | undefined) => void
  'theme-change': (colorTheme: ColorTheme) => void
  'selection-change': (e: TextEditorSelectionChangeEvent) => void
  'editor-visible': (editors: readonly TextEditor[]) => void
  'activeText-change': (editor: TextEditor | undefined) => void
  'text-visible-change': (e: TextEditorVisibleRangesChangeEvent) => void
  'text-column-change': (e: TextEditorViewColumnChangeEvent) => void
  'onfocus': (e: WindowState) => void
}
export interface WorkspaceCallbackMap {
  'text-change': (e: TextDocumentChangeEvent) => void
  'text-open': (doc: TextDocument) => void
  'text-save': (doc: TextDocument) => void
  'workspace-change': (e: WorkspaceFoldersChangeEvent) => void
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
  done: (report: ProgressReport) => Thenable<void>
}
export type ProgressReport = (value: {
  message?: string | undefined
  increment?: number | undefined
}) => void

export type PositionOption1 = [number, number]
type LooseObject = Record<string, unknown>

export type PositionOption2 = ({
  line: number
  character?: number
  column: number
} & LooseObject) | ({
  line: number
  character: number
  column?: number
} & LooseObject)

export interface WatchFilesOptions {
  onCreate?: (e: Uri) => void
  onChange?: (e: Uri) => void
  onDelete?: (e: Uri) => void
  ignoreCreateEvents?: boolean
  ignoreChangeEvents?: boolean
  ignoreDeleteEvents?: boolean
}

export interface RangeLoc extends LooseObject {
  start: PositionOption2
  end: PositionOption2
}

export interface CreateInputOptions {
  ignoreFocusOut?: boolean
  password?: boolean
  prompt?: string
  title?: string
  value: string
  selection?: [number, number]
  placeholder?: string
  /**
   * @deprecated Use `placeholder` instead.
   */
  placeHolder?: string
  validate?: (value: string) => string | InputBoxValidationMessage | undefined | null
    | Thenable<string | InputBoxValidationMessage | undefined | null>
}

export type ISelections = { start: PositionOption2 | PositionOption1, end: PositionOption2 | PositionOption1, position?: 'left' | 'right' }[]

export type ClearStyle = () => void

export type ConfigurationName = `${string}.${string}`

export interface ConfigurationRef<T> {
  readonly value: T
  dispose: Disposable
}

export interface QuickPickOptions {
  canSelectMany?: boolean
  title?: string
  value?: string
  placeholder?: string
  buttons?: readonly QuickInputButton[]
  matchOnDescription?: boolean
  keepScrollPosition?: boolean
  activeItems?: string[]
  ignoreFocusOut?: boolean
  onDidTriggerButton?: (e: QuickInputButton) => void
  onDidTriggerItemButton?: (e: QuickPickItemButtonEvent<QuickPickItem>) => void
  onDidChangeActive?: (items: readonly QuickPickItem[]) => void
  onDidChangeValue?: (value: string) => void
  onDidChange?: (items: readonly QuickPickItem[]) => void
  onDidAccept?: () => void
  onDidHide?: () => void
}

export type quickPickOptions = QuickPickOptions

export interface WriteableSignal<T> {
  (): T
  (value: T): void
}

export interface DisposableSignal<T> extends WriteableSignal<T>, Disposable {}
