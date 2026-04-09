import type { TextEditor } from 'vscode'
import type { DisposableSignal } from './types'
import { addEventListener } from './addEventListener'
import { createReactiveValue } from './createReactiveValue'
import { getSelection } from './getSelection'

export function useSelection(textEditor?: TextEditor): DisposableSignal<ReturnType<typeof getSelection>> {
  return createReactiveValue(() => getSelection(textEditor), (update) => {
    return addEventListener('selection-change', (e) => {
      if (!textEditor || e.textEditor === textEditor)
        update()
    })
  })
}
