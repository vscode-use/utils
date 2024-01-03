import * as vscode from 'vscode'

/**
 * 创建定义的位置
 * @param url 路径
 * @param position 位置
 * @returns
 */
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
