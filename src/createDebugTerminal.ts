import * as vscode from 'vscode'
export function createDebugTerminal(command: string, name = 'Javascript Debug Terminal', request: 'launch' | 'attach' = 'launch') {
  const _command = command.trim().split(' ')
  const runtimeExecutable = _command[0]
  const runtimeArgs = _command.slice(1).filter(Boolean)
  return vscode.debug.startDebugging(undefined, {
    type: 'node',
    request,
    name,
    runtimeExecutable,
    runtimeArgs,
    console: 'integratedTerminal',
  })
}
