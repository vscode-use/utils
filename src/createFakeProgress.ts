import { createProgress } from './createProgress'

export function createFakeProgress(options: {
  title: string
  interval?: number
  message: (increment: number) => string | void
  callback: (resolve: (value?: unknown) => void, reject: (msg?: string) => void) => void
}) {
  const { title, interval = 10, message, callback } = options
  createProgress({
    title,
    async done(report) {
      try {
        let timer
        await new Promise((_resolve, _reject) => {
          let increment = 0
          callback(_resolve, _reject)
          timer = setInterval(() => {
            if (increment < 99) {
              increment++
              report({
                message: message(increment) || `Progress bar ${increment}% completed`,
                increment,
              })
            }
          }, interval)
        })

        clearInterval(timer)
        report({
          message: 'Progress bar 100% completed',
          increment: 100,
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
