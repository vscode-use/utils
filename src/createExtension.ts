import type * as vscode from 'vscode'
import { createEffectDeps, setEffectDeps } from './util'

export type ActivateExtension = (
  context: vscode.ExtensionContext,
  disposals?: vscode.Disposable[],
) => void | vscode.Disposable[] | Promise<void | vscode.Disposable[]>

export type DeactivateExtension = (ext: unknown) => void

export interface ExtensionModule {
  activate: (context: vscode.ExtensionContext) => Promise<void>
  deactivate: DeactivateExtension | undefined
}

export function createExtension(
  activate: ActivateExtension,
  deactivate?: DeactivateExtension,
): ExtensionModule {
  const wrapperActivate = async (context: vscode.ExtensionContext): Promise<void> => {
    const disposals: vscode.Disposable[] = createEffectDeps()
    try {
      const dispose = await activate(context, disposals)
      if (dispose)
        disposals.push(...dispose)

      context.subscriptions.push(...disposals)
      setEffectDeps(context.subscriptions)
    }
    catch (error) {
      setEffectDeps(context.subscriptions)
      throw error
    }
  }
  return {
    activate: wrapperActivate,
    deactivate,
  }
}
