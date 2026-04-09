import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('createInput', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('prefers placeholder and falls back to placeHolder', async () => {
    const showInputBox = vi.fn()

    vi.doMock('vscode', () => ({
      window: {
        showInputBox,
      },
    }))

    const { createInput } = await import('../src/createInput')

    createInput({
      value: 'test',
      placeholder: 'new placeholder',
      placeHolder: 'legacy placeholder',
    })
    createInput({
      value: 'test',
      placeHolder: 'legacy placeholder',
    })

    expect(showInputBox).toHaveBeenNthCalledWith(1, expect.objectContaining({
      placeHolder: 'new placeholder',
    }))
    expect(showInputBox).toHaveBeenNthCalledWith(2, expect.objectContaining({
      placeHolder: 'legacy placeholder',
    }))
  })
})
