import * as vscode from 'vscode'

/**
 * 创建一个调试终端
 * @param command 参数
 * @param name 终端名称
 * @param request 调试会话的请求类型 'launch' | 'attach' 默认 'launch'
 * @returns Thenable<boolean>
 */
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
