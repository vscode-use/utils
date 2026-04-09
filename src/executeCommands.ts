import { executeCommand } from './executeCommand'

export type CommandCall = readonly [name: string, ...params: unknown[]]

/**
 * 执行多条命令
 * @param options Array<[string, ...unknown[]]>
 * @returns Array<Thenable<T | undefined>>
 */
export function executeCommands<T = unknown>(options: readonly CommandCall[]): Array<Thenable<T | undefined>> {
  return options.map(([name, ...params]) => executeCommand<T>(name, ...params))
}
