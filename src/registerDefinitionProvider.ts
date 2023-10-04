import * as vscode from 'vscode'
import type { DefinitionProvider, DocumentSelector } from 'vscode'
export function registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider) {
  return vscode.languages.registerDefinitionProvider(selector, provider)
}
