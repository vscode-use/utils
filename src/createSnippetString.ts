import * as vscode from 'vscode'

/**
 * 创建代码片段
 * @param str
 * @returns SnippetString
 */
export function createSnippetString(str: string | string[]): vscode.SnippetString {
  return new vscode.SnippetString(typeof str === 'string' ? str : str.join('\n'))
}
