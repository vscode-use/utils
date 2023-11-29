import * as vscode from 'vscode'
import type { ConfigurationTarget } from 'vscode'

export function setConfiguration(name: string, value: any, configurationTarget?: ConfigurationTarget | boolean | null, overrideInLanguage?: boolean) {
  const config = vscode.workspace.getConfiguration()
  return config.update(name, value, configurationTarget, overrideInLanguage)
}
