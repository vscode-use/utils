import * as vscode from 'vscode'

export function createDefinitionLocation(url: string, position: vscode.Position | number) {
  if (typeof position === 'number')
    position = new vscode.Position(position, 0)

  return new vscode.Location(
    // 定义所在的文件路径
    vscode.Uri.file(url),
    // 定义所在的行列信息
    position,
  )
}
