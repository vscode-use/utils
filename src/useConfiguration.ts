import type { ConfigurationName, DisposableSignal } from './types'
import { addEventListener } from './addEventListener'
import { createReactiveValue } from './createReactiveValue'
import { getConfiguration } from './getConfiguration'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns DisposableSignal<T | undefined>
 */
export function useConfiguration<T>(name: ConfigurationName, defaultValue: T): DisposableSignal<T>
export function useConfiguration<T>(name: ConfigurationName, defaultValue?: T): DisposableSignal<T | undefined>
export function useConfiguration<T>(name: ConfigurationName, defaultValue?: T): DisposableSignal<T | undefined> {
  const splitIndex = name.indexOf('.')
  const scopedName = name.slice(0, splitIndex)
  return createReactiveValue(() => getConfiguration<T>(name, defaultValue), (update) => {
    return addEventListener('config-change', (e) => {
      if (e.affectsConfiguration(scopedName))
        update()
    })
  })
}
