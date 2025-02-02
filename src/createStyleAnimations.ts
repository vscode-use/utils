import type { DecorationRenderOptions, Range } from 'vscode'
import type { ClearStyle } from './types'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'

/**
 * createStyleAnimations
 * @param styles { style: DecorationRenderOptions; duration?: number; delay?: number }[] 样式组
 * @param options { duration?: number; range: Range; delay?: number }
 * @param options.duration number 动画持续时间
 * @param options.range Range 范围
 * @param options.delay number 动画延迟时间
 * @returns 最后一个动画的清除函数
 */
export async function createStyleAnimations(styles: { style: DecorationRenderOptions, duration?: number, delay?: number }[], options: { duration?: number, range: Range, delay?: number }): Promise<ClearStyle | undefined> {
  let lastClearStyle!: ClearStyle
  for (const s of styles) {
    if (lastClearStyle)
      lastClearStyle()
    const style = createStyle(s.style)
    const duration = s.duration ?? options.duration ?? 0
    const delay = s.delay ?? options.delay ?? 0
    await new Promise(resolve =>
      setTimeout(() => {
        lastClearStyle = setStyle(style, options.range)!
        setTimeout(resolve, duration)
      }, delay),
    )
  }
  return lastClearStyle
}
