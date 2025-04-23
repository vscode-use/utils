import * as vscode from './vscode-shim'

export interface InlayHintOptions {
  position: vscode.Position
  label: string | vscode.InlayHintLabelPart[]
  tooltip?: string | vscode.MarkdownString | undefined
  kind?: vscode.InlayHintKind
  textEdits?: vscode.TextEdit[]
  paddingLeft?: boolean
  paddingRight?: boolean
}

/**
 * 创建InlayHint
 * @param options InlayHintOptions
 * @param options.position 位置
 * @param options.label 标签
 * @param options.tooltip 提示
 * @param options.kind 类型
 * @param options.textEdits 文本编辑
 * @param options.paddingLeft 是否左边填充
 * @param options.paddingRight 是否右边填充
 * @returns InlayHint
 */
export function createInlayHint(options: InlayHintOptions) {
  const { position, label, kind } = options
  return Object.assign(new vscode.InlayHint(position, label, kind), options)
}
