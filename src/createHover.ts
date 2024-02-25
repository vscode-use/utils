import * as vscode from 'vscode'

export function createHover(contents: vscode.MarkdownString | Array<vscode.MarkdownString>, range?: vscode.Range) {
  return new vscode.Hover(contents, range)
}
