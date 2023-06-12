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
| 'text-change'
| 'text-open'
| 'text-save'
| 'folder-change'
| 'file-create'
| 'file-delete'
| 'rename'
