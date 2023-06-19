import * as vscode from 'vscode'
export function createSnippetString(str: string | string[]) {
  return new vscode.SnippetString(typeof str === 'string' ? str : str.join('\n'))
}
