import type { DecorationRenderOptions, TextEditorDecorationType } from 'vscode'
import type { StyleAnimationOptions } from './createStyleAnimation'
import type { ClearStyle } from './types'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'

export interface StyleAnimationStep {
  style: DecorationRenderOptions
  duration?: number
  delay?: number
}

/**
 * createStyleAnimations
 * @param styles { style: DecorationRenderOptions; duration?: number; delay?: number }[] 样式组
 * @param options { duration?: number; range: Range; delay?: number }
 * @param options.duration number 动画持续时间
 * @param options.range Range 范围
 * @param options.delay number 动画延迟时间
 * @param options.textEditor TextEditor 指定编辑器
 * @returns 最后一个动画的清除函数
 */
export async function createStyleAnimations(
  styles: StyleAnimationStep[],
  options: StyleAnimationOptions,
): Promise<ClearStyle | undefined> {
  let lastClearStyle: ClearStyle | undefined
  let lastDecorationType: TextEditorDecorationType | undefined
  for (const s of styles) {
    if (lastClearStyle) {
      lastClearStyle()
      lastDecorationType?.dispose()
      lastClearStyle = undefined
      lastDecorationType = undefined
    }

    const style = createStyle(s.style)
    const duration = s.duration ?? options.duration ?? 0
    const delay = s.delay ?? options.delay ?? 0
    await new Promise(resolve =>
      setTimeout(() => {
        const clearStyle = setStyle(style, options.range, options.textEditor)
        if (!clearStyle) {
          style.dispose()
          resolve(true)
          return
        }

        lastClearStyle = clearStyle
        lastDecorationType = style
        setTimeout(resolve, duration)
      }, delay),
    )
  }

  if (!lastClearStyle || !lastDecorationType)
    return

  return () => {
    lastClearStyle?.()
    lastDecorationType?.dispose()
  }
}
