import type * as vscode from 'vscode'

export function createExtension(activate: (context: vscode.ExtensionContext, disposals: { dispose: () => any }[]) => void | { dispose: () => any }[] | Promise<void | { dispose: () => any }[]>, deactivate?: (ext: any) => void) {
  const wrapperActivate = async (context: vscode.ExtensionContext) => {
    const disposals: { dispose: () => any }[] = []
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
