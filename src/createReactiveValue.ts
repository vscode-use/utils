import type { Disposable } from 'vscode'
import type { DisposableSignal } from './types'
import { signal } from 'alien-signals'

export function createReactiveValue<T>(getValue: () => T, subscribe: (update: () => void) => Disposable): DisposableSignal<T> {
  let disposed = false
  const state = signal(getValue()) as DisposableSignal<T>
  const subscription = subscribe(() => {
    if (!disposed)
      state(getValue())
  })
  state.dispose = () => {
    if (disposed)
      return
    disposed = true
    subscription.dispose()
  }
  return state
}
