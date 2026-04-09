import type { ConfigurationName } from './types'
import * as vscode from 'vscode'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns WorkspaceConfiguration | T | undefined
 */
export function getConfiguration<T>(name: ConfigurationName, defaultValue: T): T
export function getConfiguration<T>(name: ConfigurationName, defaultValue?: T): T | undefined
export function getConfiguration(name: string): vscode.WorkspaceConfiguration
export function getConfiguration<T>(name: string, defaultValue?: T): vscode.WorkspaceConfiguration | T | undefined {
  const splitIndex = name.indexOf('.')
  if (splitIndex === -1)
    return vscode.workspace.getConfiguration(name)

  const scopedName = name.slice(0, splitIndex)
  const propName = name.slice(splitIndex + 1)
  return vscode.workspace.getConfiguration(scopedName).get(propName, defaultValue)
}
