import { executeCommand } from './executeCommand'

/**
 * 执行多条命令
 * @param options Array<[string, ...any[]]>
 * @returns Array<Thenable<any>>
 */
export function executeCommands(options: Array<[string, ...any[]]>) {
  return options.map(([name, ...params]) => executeCommand(name, ...params))
}
