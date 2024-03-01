import type { DecorationRenderOptions, Range } from 'vscode'
import { createStyle } from './createStyle'
import { setStyle } from './setStyle'
import type { ClearStyle } from './types'

export async function createStyleAnimations(styles: { style: DecorationRenderOptions; duration?: number; delay?: number }[], options: { duration?: number; range: Range; delay?: number }): Promise<ClearStyle | undefined> {
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

