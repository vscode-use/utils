import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('watch and debug helpers', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('returns a disposable from watchFiles that disposes every watcher', async () => {
    const watchers = [
      { dispose: vi.fn() },
      { dispose: vi.fn() },
    ]
    const watchFile = vi.fn()
      .mockReturnValueOnce(watchers[0])
      .mockReturnValueOnce(watchers[1])

    class Disposable {
      constructor(private readonly onDispose: () => void) {}

      dispose() {
        this.onDispose()
      }
    }

    vi.doMock('../src/watchFile', () => ({
      watchFile,
    }))
    vi.doMock('vscode', () => ({
      Disposable,
    }))

    const { watchFiles } = await import('../src/watchFiles')

    const disposable = watchFiles(['a', 'b'], {
      onChange: () => {},
    })

    disposable.dispose()

    expect(watchFile).toHaveBeenCalledTimes(2)
    expect(watchers[0].dispose).toHaveBeenCalledTimes(1)
    expect(watchers[1].dispose).toHaveBeenCalledTimes(1)
  })

  it('passes runtimeExecutable and runtimeArgs directly to startDebugging', async () => {
    const startDebugging = vi.fn()

    vi.doMock('vscode', () => ({
      debug: {
        startDebugging,
      },
    }))

    const { createDebugTerminal } = await import('../src/createDebugTerminal')

    createDebugTerminal({
      runtimeExecutable: 'node',
      runtimeArgs: ['./my script.js', '--inspect'],
      name: 'Debug',
      request: 'attach',
    })

    expect(startDebugging).toHaveBeenCalledWith(undefined, {
      type: 'node',
      request: 'attach',
      name: 'Debug',
      runtimeExecutable: 'node',
      runtimeArgs: ['./my script.js', '--inspect'],
      console: 'integratedTerminal',
    })
  })
})
