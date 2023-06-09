export interface MessageOption {
  message: string
  type?: 'info' | 'error'
  buttons?: string[] | string
}
