import type { ConfigurationName, ConfigurationRef } from './types'
import { addEventListener } from './addEventListener'
import { getConfiguration } from './getConfiguration'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns ConfigurationRef<T | undefined>
 */
export function getRefConfiguration<T>(name: ConfigurationName, defaultValue: T): ConfigurationRef<T>
export function getRefConfiguration<T>(name: ConfigurationName, defaultValue?: T): ConfigurationRef<T | undefined>
export function getRefConfiguration<T>(name: ConfigurationName, defaultValue?: T): ConfigurationRef<T | undefined> {
  const scopedName = name.split('.')[0]

  let value = getConfiguration(name, defaultValue)

  return {
    get value() {
      return value
    },
    dispose: addEventListener('config-change', (e) => {
      if (e.affectsConfiguration(scopedName)) {
        value = getConfiguration(name, defaultValue)
      }
    }),
  }
}
