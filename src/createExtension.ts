import type * as vscode from 'vscode'

export function createExtension(activate: (context: vscode.ExtensionContext, disposals: { dispose: () => any }[]) => void | { dispose: () => any }[], deactivate?: (ext: any) => void) {
  const wrapperActivate = (context: vscode.ExtensionContext) => {
    const disposals: { dispose: () => any }[] = []
    const dispose = activate(context, disposals)
    if (dispose)
      disposals.push(...dispose)

    context.subscriptions.push(...disposals)
  }
  return {
    activate: wrapperActivate,
    deactivate,
  }
}
