import { createProgress } from './createProgress'

export interface CreateFakeProgressOptions {
  title: string
  interval?: number
  message?: (increment: number) => string | void
  callback: (resolve: (value?: unknown) => void, reject: (msg?: string) => void) => void
}

export function createFakeProgress(options: CreateFakeProgressOptions): void {
  const { title, interval = 10, message, callback } = options
  createProgress({
    title,
    async done(report) {
      try {
        let timer: ReturnType<typeof setInterval> | undefined
        let progress = 0
        await new Promise((_resolve, _reject) => {
          callback(_resolve, _reject)
          timer = setInterval(() => {
            if (progress < 99) {
              progress++
              report({
                message: message?.(progress) || `Progress bar ${progress}% completed`,
                increment: 1,
              })
            }
          }, interval)
        })

        if (timer)
          clearInterval(timer)
        report({
          message: message?.(100) || `Progress bar 100% completed`,
          increment: 100 - progress,
        })

        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(true)
          }, 100)
        })
      }
      catch (error) {
        report({
          message: String(error) || '❌ Something Wrong',
          increment: 100,
        })
      }
    },
  })
}
