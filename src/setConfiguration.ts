import type { ConfigurationTarget } from 'vscode'
import * as vscode from 'vscode'

/**
 * 设置配置
 * @param name 配置名
 * @param value 值
 * @param configurationTarget 范围
 * @param overrideInLanguage 是否覆盖默认
 * @returns Thenable<void>
 */
export function setConfiguration<T>(
  name: string,
  value: T,
  configurationTarget?: ConfigurationTarget | boolean | null,
  overrideInLanguage?: boolean,
): Thenable<void> {
  const config = vscode.workspace.getConfiguration()
  return config.update(name, value, configurationTarget, overrideInLanguage)
}
