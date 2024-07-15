import { registerCommand } from './registerCommand'

/**
 * 注册多个指令
 * @param options Array<[string, (...args: any[]) => any]>
 * @returns Disposable[]
 */
export function registerCommands(
  options: Array<[string, (...args: any[]) => any]>,
) {
  return options.map(([name, callback]) => registerCommand(name, callback))
}
