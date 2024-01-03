import * as vscode from 'vscode'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns
 */
export function getConfiguration(name: string) {
  const [scopedName, propName] = name.split('.')

  return propName
    ? vscode.workspace.getConfiguration(scopedName).get(propName)
    : vscode.workspace.getConfiguration(name)
}
