import * as vscode from 'vscode'

export type HoverContents = vscode.MarkdownString | vscode.MarkedString | Array<vscode.MarkdownString | vscode.MarkedString>

export function createHover(
  contents: HoverContents,
  range?: vscode.Range,
): vscode.Hover {
  return new vscode.Hover(contents, range)
}
