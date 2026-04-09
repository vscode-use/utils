import type * as vscode from 'vscode'

let effectMaps: vscode.Disposable[] = []

export function createEffectDeps(): vscode.Disposable[] {
  effectMaps = []
  return effectMaps
}

export function setEffectDeps(disposables: vscode.Disposable[]): void {
  effectMaps = disposables
}

export function addEffect<T extends vscode.Disposable>(effect: T): T {
  effectMaps.push(effect)
  return effect
}
