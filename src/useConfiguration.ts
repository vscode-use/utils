import type { WriteableSignal } from './types'
import { signal } from 'alien-signals'
import { addEventListener } from './addEventListener'
import { getConfiguration } from './getConfiguration'

/**
 * 获取配置
 * @param name 配置名，支持直接获取到xx.a下的value
 * @returns any
 */
type ScopedName = `${string}.${string}`

export function useConfiguration<T>(name: ScopedName, defaultValue?: T): WriteableSignal<T> {
  const splitIndex = name.indexOf('.')
  const scopedName = name.slice(0, splitIndex)
  const initialValue = getConfiguration<T>(name, defaultValue)

  const config = signal<T>(initialValue as T)
  addEventListener('config-change', (e) => {
    if (e.affectsConfiguration(scopedName))
      config(getConfiguration<T>(name, defaultValue) as T)
  })
  return config
}
