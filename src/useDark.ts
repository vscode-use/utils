import type { WriteableSignal } from './types'
import { signal } from 'alien-signals'
import { addEventListener } from './addEventListener'
import { isDark } from './isDark'

/**
 * 判断当前主题色
 * @returns boolean
 */
export function useDark(): WriteableSignal<boolean> {
  const color = signal(isDark())
  addEventListener('theme-change', () => {
    color(isDark())
  })
  return color
}
