import * as vscode from 'vscode'
import { signal } from 'alien-signals'
import { addEventListener } from './addEventListener'
import { getConfiguration } from './getConfiguration'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns any
 */
type ScopedName = `${string}.${string}`

export function useConfiguration<T>(name: ScopedName, defaultValue?: T) {
  const [scopedName, propName] = name.split('.')

  const config = signal<any>(vscode.workspace.getConfiguration(scopedName).get(propName, defaultValue))
  addEventListener('config-change', (e) => {
    if (e.affectsConfiguration(scopedName)) {
      config(getConfiguration(name))
    }
  })
  return config
}
