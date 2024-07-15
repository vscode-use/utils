import { executeCommand } from './executeCommand'

/**
 * 执行多条命令
 * @param options Array<[string, ...params: any[]]>
 * @returns Array<Thenable<any>>
 */
export function executeCommands(options: Array<[string, ...params: any[]]>): Array<Thenable<any>> {
  return options.map(([name, ...params]) => executeCommand(name, ...params))
}
