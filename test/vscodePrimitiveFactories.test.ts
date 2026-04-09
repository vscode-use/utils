import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('vscode primitive factories', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  it('creates uris, positions, definition locations, and completion kinds', async () => {
    const file = vi.fn((value: string) => ({ scheme: 'file', path: value }))
    const Position = vi.fn(function(this: Record<string, unknown>, line: number, character: number) {
      this.line = line
      this.character = character
    })
    const Location = vi.fn(function(this: Record<string, unknown>, uri: unknown, position: unknown) {
      this.uri = uri
      this.position = position
    })

    vi.doMock('vscode', () => ({
      Uri: {
        file,
      },
      Position,
      Location,
      CompletionItemKind: {
        Function: 3,
      },
    }))

    const { toUri } = await import('../src/toUri')
    const { createPosition } = await import('../src/createPosition')
    const { createDefinitionLocation } = await import('../src/createDefinitionLocation')
    const { createCompletionKind } = await import('../src/createCompletionKind')

    expect(toUri('/tmp/demo.ts')).toEqual({ scheme: 'file', path: '/tmp/demo.ts' })
    expect(createPosition([4, 8])).toMatchObject({ line: 4, character: 8 })
    expect(createPosition({ line: 6, column: 9 }, 1, 2)).toMatchObject({ line: 5, character: 7 })
    expect(createDefinitionLocation('/tmp/demo.ts', 3)).toMatchObject({
      uri: { scheme: 'file', path: '/tmp/demo.ts' },
      position: { line: 3, character: 0 },
    })
    expect(createCompletionKind('Function')).toBe(3)
  })

  it('creates progress through vscode window with the expected lifecycle', async () => {
    const report = vi.fn()
    const onCancellationRequested = vi.fn()
    const withProgress = vi.fn((options, task) =>
      task({ report }, { onCancellationRequested }),
    )
    const cancel = vi.fn()
    const done = vi.fn(async progressReport => {
      progressReport({ message: 'working', increment: 5 })
    })

    vi.doMock('vscode', () => ({
      ProgressLocation: {
        Notification: 15,
      },
      window: {
        withProgress,
      },
    }))

    const { createProgress } = await import('../src/createProgress')

    await createProgress({
      title: 'demo',
      cancel,
      done,
    })

    expect(withProgress).toHaveBeenCalledWith({
      location: 15,
      title: 'demo',
      cancellable: false,
    }, expect.any(Function))
    expect(onCancellationRequested).toHaveBeenCalledWith(expect.any(Function))
    expect(done).toHaveBeenCalledWith(expect.any(Function))
    expect(report).toHaveBeenNthCalledWith(1, { increment: 0 })
    expect(report).toHaveBeenNthCalledWith(2, { message: 'working', increment: 5 })
  })
})
