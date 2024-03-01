import type { DecorationRenderOptions, Range } from 'vscode'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'
import type { ClearStyle } from './types'

/**
 * createStyleAnimation
 * @param s1 DecorationRenderOptions
 * @param s2 DecorationRenderOptions
 * @param options { duration?: number; range: Range; delay?: number }
 * @returns 第二个动画的清除函数
 */
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

