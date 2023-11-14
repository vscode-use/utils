import * as vscode from 'vscode'
import type { DocumentSelector, HoverProvider } from 'vscode'

export function registerHoverProvider(selector: DocumentSelector, provider: HoverProvider) {
  return vscode.languages.registerHoverProvider(selector, provider)
}
