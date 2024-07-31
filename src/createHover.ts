import * as vscode from 'vscode'

export function createHover(contents: vscode.MarkdownString | vscode.MarkedString | Array<vscode.MarkdownString | vscode.MarkedString>, range?: vscode.Range) {
  return new vscode.Hover(contents, range)
}
