import * as vscode from 'vscode'
import type { DocumentSelector, HoverProvider } from 'vscode'

export function registerHoverProvider(selector: DocumentSelector, provideHover: HoverProvider['provideHover']) {
  return vscode.languages.registerHoverProvider(selector, { provideHover })
}
