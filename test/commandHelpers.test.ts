import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('command helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('registerCommands registers each command and returns disposables', async () => {
    const disposables = [
      { dispose: vi.fn() },
      { dispose: vi.fn() },
    ]
    const registerCommandMock = vi.fn()
      .mockReturnValueOnce(disposables[0])
      .mockReturnValueOnce(disposables[1])

    vi.doMock('vscode', () => ({
      commands: {
        registerCommand: registerCommandMock,
      },
    }))

    const { registerCommands } = await import('../src/registerCommands')

    const result = registerCommands([
      ['one', () => 'a'],
      ['two', () => 'b'],
    ])

    expect(registerCommandMock).toHaveBeenNthCalledWith(1, 'one', expect.any(Function))
    expect(registerCommandMock).toHaveBeenNthCalledWith(2, 'two', expect.any(Function))
    expect(result).toEqual(disposables)
  })

  it('encodes command params as a URI-safe JSON string', async () => {
    const { setCommandParams } = await import('../src/setCommandParams')

    expect(setCommandParams(['a', 1, { ok: true }])).toBe(encodeURIComponent(JSON.stringify(['a', 1, { ok: true }])))
  })
})
