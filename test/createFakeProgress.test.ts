import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('createFakeProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.resetModules()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('reports fixed increments before the final completion update', async () => {
    const reports: Array<{ increment?: number, message?: string }> = []
    const createProgress = vi.fn(async ({ done }: { done: (report: (value: { increment?: number, message?: string }) => void) => Promise<void> }) => {
      await done((value) => {
        reports.push(value)
      })
    })

    vi.doMock('../src/createProgress', () => ({
      createProgress,
    }))

    const { createFakeProgress } = await import('../src/createFakeProgress')

    createFakeProgress({
      title: 'progress',
      interval: 10,
      callback(resolve) {
        setTimeout(() => resolve(true), 35)
      },
    })

    await vi.runAllTimersAsync()

    const increments = reports.map(report => report.increment ?? 0)
    expect(increments.slice(0, -1)).toEqual([1, 1, 1])
    expect(increments.reduce((total, increment) => total + increment, 0)).toBe(100)
  })
})
