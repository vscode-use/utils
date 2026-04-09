import type { DecorationRenderOptions, Range, TextEditor, TextEditorDecorationType } from 'vscode'
import type { ClearStyle } from './types'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'

export interface StyleAnimationOptions {
  duration?: number
  range: Range
  delay?: number
  textEditor?: TextEditor
}

/**
 * createStyleAnimation
 * @param s1 DecorationRenderOptions
 * @param s2 DecorationRenderOptions
 * @param options { duration?: number; range: Range; delay?: number }
 * @param options.duration number 动画持续时间
 * @param options.range Range 范围
 * @param options.delay number 动画延迟时间
 * @param options.textEditor TextEditor 指定编辑器
 * @returns 第二个动画的清除函数
 */
export function createStyleAnimation(
  s1: DecorationRenderOptions,
  s2: DecorationRenderOptions,
  options: StyleAnimationOptions,
): Promise<ClearStyle | undefined> {
  const { duration = 1000, range, delay = 0, textEditor } = options
  return new Promise((resolve) => {
    setTimeout(() => {
      const style1 = createStyle(s1)
      const clear1 = setStyle(style1, range, textEditor)
      setTimeout(() => {
        clear1?.()
        style1.dispose()

        const style2 = createStyle(s2)
        const clear2 = setStyle(style2, range, textEditor)
        if (!clear2) {
          style2.dispose()
          resolve(undefined)
          return
        }

        resolve(createDecorationClear(clear2, style2))
      }, duration)
    }, delay)
  })
}

function createDecorationClear(clear: ClearStyle, decorationType: TextEditorDecorationType): ClearStyle {
  return () => {
    clear()
    decorationType.dispose()
  }
}
