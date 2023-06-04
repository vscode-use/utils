export interface MessageOption<T> {
  message: string
  type: 'info' | 'error'
  buttons?: T[]
}
