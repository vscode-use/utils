import * as vscode from 'vscode'
import type { DefinitionProvider, DocumentSelector } from 'vscode'

export function registerDefinitionProvider(selector: DocumentSelector, provideDefinition: DefinitionProvider['provideDefinition']) {
  return vscode.languages.registerDefinitionProvider(selector, { provideDefinition })
}
