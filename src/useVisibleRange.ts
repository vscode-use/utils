import type { TextEditor } from 'vscode'
import type { DisposableSignal } from './types'
import { addEventListener } from './addEventListener'
import { createReactiveValue } from './createReactiveValue'
import { getVisibleRange } from './getVisibleRange'

export function useVisibleRange(textEditor?: TextEditor): DisposableSignal<ReturnType<typeof getVisibleRange>> {
  return createReactiveValue(() => getVisibleRange(textEditor), (update) => {
    return addEventListener('text-visible-change', (e) => {
      if (!textEditor || e.textEditor === textEditor)
        update()
    })
  })
}
