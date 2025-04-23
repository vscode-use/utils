import * as vscode from './vscode-shim'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns any
 */
export function getConfiguration<T>(name: string, defaultValue?: T): any {
  const [scopedName, propName] = name.split('.')

  return propName
    ? vscode.workspace.getConfiguration(scopedName).get(propName, defaultValue)
    : vscode.workspace.getConfiguration(name)
}
