import * as vscode from 'vscode'

/**
 * 创建外部输出管道
 * @param name string
 * @param languageId string
 * @returns OutputChannel
 */
export function createOutputChannel(name: string, languageId?: string): vscode.OutputChannel {
  return vscode.window.createOutputChannel(name, languageId)
}
