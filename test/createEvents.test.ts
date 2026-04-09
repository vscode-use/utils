import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('createEvents', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('subscribes, emits, and unsubscribes listeners', async () => {
    const { createEvents } = await import('../src/createEvents')
    const events = createEvents<{ ping: (value: number) => void }>()
    const listener = vi.fn()

    const off = events.on('ping', listener)

    events.emit('ping', 1)
    off()
    events.emit('ping', 2)

    expect(listener).toHaveBeenCalledTimes(1)
    expect(listener).toHaveBeenCalledWith(1)
  })
})
