import type { DisposableSignal } from './types'
import { addEventListener } from './addEventListener'
import { createReactiveValue } from './createReactiveValue'
import { isDark } from './isDark'

/**
 * 判断当前主题色
 * @returns DisposableSignal<boolean>
 */
export function useDark(): DisposableSignal<boolean> {
  return createReactiveValue(isDark, (update) => {
    return addEventListener('theme-change', () => {
      update()
    })
  })
}
