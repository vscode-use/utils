import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('style animations', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.resetModules()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('disposes decoration types in createStyleAnimation', async () => {
    const style1 = { dispose: vi.fn() }
    const style2 = { dispose: vi.fn() }
    const clear1 = vi.fn()
    const clear2 = vi.fn()
    const setStyle = vi.fn()
      .mockReturnValueOnce(clear1)
      .mockReturnValueOnce(clear2)

    vi.doMock('../src/createStyle', () => ({
      createStyle: vi.fn()
        .mockReturnValueOnce(style1)
        .mockReturnValueOnce(style2),
    }))
    vi.doMock('../src/setStyle', () => ({
      setStyle,
    }))

    const { createStyleAnimation } = await import('../src/createStyleAnimation')
    const textEditor = { id: 'editor' }

    const promise = createStyleAnimation({} as never, {} as never, {
      range: {} as never,
      duration: 20,
      delay: 5,
      textEditor: textEditor as never,
    })

    await vi.runAllTimersAsync()
    const clear = await promise

    expect(setStyle).toHaveBeenNthCalledWith(1, style1, expect.anything(), textEditor)
    expect(setStyle).toHaveBeenNthCalledWith(2, style2, expect.anything(), textEditor)

    expect(clear1).toHaveBeenCalledTimes(1)
    expect(style1.dispose).toHaveBeenCalledTimes(1)
    expect(style2.dispose).not.toHaveBeenCalled()

    clear?.()

    expect(clear2).toHaveBeenCalledTimes(1)
    expect(style2.dispose).toHaveBeenCalledTimes(1)
  })

  it('disposes intermediate and final decoration types in createStyleAnimations', async () => {
    const style1 = { dispose: vi.fn() }
    const style2 = { dispose: vi.fn() }
    const clear1 = vi.fn()
    const clear2 = vi.fn()
    const setStyle = vi.fn()
      .mockReturnValueOnce(clear1)
      .mockReturnValueOnce(clear2)

    vi.doMock('../src/createStyle', () => ({
      createStyle: vi.fn()
        .mockReturnValueOnce(style1)
        .mockReturnValueOnce(style2),
    }))
    vi.doMock('../src/setStyle', () => ({
      setStyle,
    }))

    const { createStyleAnimations } = await import('../src/createStyleAnimations')
    const textEditor = { id: 'editor' }

    const promise = createStyleAnimations([
      { style: {} as never, duration: 20, delay: 5 },
      { style: {} as never, duration: 20, delay: 5 },
    ], {
      range: {} as never,
      textEditor: textEditor as never,
    })

    await vi.runAllTimersAsync()
    const clear = await promise

    expect(setStyle).toHaveBeenNthCalledWith(1, style1, expect.anything(), textEditor)
    expect(setStyle).toHaveBeenNthCalledWith(2, style2, expect.anything(), textEditor)

    expect(clear1).toHaveBeenCalledTimes(1)
    expect(style1.dispose).toHaveBeenCalledTimes(1)
    expect(style2.dispose).not.toHaveBeenCalled()

    clear?.()

    expect(clear2).toHaveBeenCalledTimes(1)
    expect(style2.dispose).toHaveBeenCalledTimes(1)
  })
})
