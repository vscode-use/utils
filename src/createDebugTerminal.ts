import * as vscode from 'vscode'

export interface CreateDebugTerminalOptions {
  runtimeExecutable: string
  runtimeArgs?: string[]
  name?: string
  request?: 'launch' | 'attach'
}

/**
 * 创建一个调试终端
 * @param options 参数
 * @returns Thenable<boolean>
 */
export function createDebugTerminal(options: CreateDebugTerminalOptions): Thenable<boolean> {
  const {
    runtimeExecutable,
    runtimeArgs = [],
    name = 'Javascript Debug Terminal',
    request = 'launch',
  } = options
  return vscode.debug.startDebugging(undefined, {
    type: 'node',
    request,
    name,
    runtimeExecutable,
    runtimeArgs,
    console: 'integratedTerminal',
  })
}
