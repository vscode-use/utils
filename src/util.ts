import type * as vscode from './vscode-shim'
// 自动收集函数副作用
export const effectMaps: vscode.Disposable[] = []
export function createEffectDeps() {
  effectMaps.length = 0
  return effectMaps
}
export function addEffect(effect: vscode.Disposable) {
  effectMaps.push(effect)
  return effect
}
