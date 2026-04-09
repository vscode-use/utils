import type * as vscode from 'vscode'
import { registerCommand } from './registerCommand'

export type CommandRegistration = readonly [name: string, callback: (...args: unknown[]) => unknown]

/**
 * 注册多个指令
 * @param options Array<[string, (...args: unknown[]) => unknown]>
 * @returns Disposable[]
 */
export function registerCommands(
  options: readonly CommandRegistration[],
): vscode.Disposable[] {
  return options.map(([name, callback]) => registerCommand(name, callback))
}
