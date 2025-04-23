import type * as vscode from './vscode-shim'
import { createEffectDeps } from './util'

export function createExtension(activate: (context: vscode.ExtensionContext, disposals?: vscode.Disposable[]) => void | vscode.Disposable[] | Promise<void | vscode.Disposable[]>, deactivate?: (ext: any) => void) {
  const wrapperActivate = async (context: vscode.ExtensionContext) => {
    const disposals: vscode.Disposable[] = createEffectDeps()
    const dispose = await activate(context, disposals)
    if (dispose)
      disposals.push(...dispose)

    context.subscriptions.push(...disposals)
  }
  return {
    activate: wrapperActivate,
    deactivate,
  }
}
