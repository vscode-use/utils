import type { DecorationRenderOptions, Range } from 'vscode'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'
import type { ClearStyle } from './types'

export function createStyleAnimation(s1: DecorationRenderOptions, s2: DecorationRenderOptions, options: { duration?: number; range: Range; delay?: number }): Promise<ClearStyle | undefined> {
  const { duration = 1000, range, delay = 0 } = options
  return new Promise((resolve) => {
    setTimeout(() => {
      const dispose = setStyle(createStyle(s1), range)
      setTimeout(() => {
        dispose?.()
        resolve(setStyle(createStyle(s2), range))
      }, duration)
    }, delay)
  })
}

