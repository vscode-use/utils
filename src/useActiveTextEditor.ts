import type { DisposableSignal } from './types'
import { addEventListener } from './addEventListener'
import { createReactiveValue } from './createReactiveValue'
import { getActiveTextEditor } from './getActiveTextEditor'

export function useActiveTextEditor(): DisposableSignal<ReturnType<typeof getActiveTextEditor>> {
  return createReactiveValue(getActiveTextEditor, (update) => {
    return addEventListener('activeText-change', () => {
      update()
    })
  })
}
