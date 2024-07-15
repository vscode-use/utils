import type * as vscode from 'vscode'

export function createExtension(activate: (context: vscode.ExtensionContext, disposals: vscode.Disposable[]) => void | vscode.Disposable[] | Promise<void | vscode.Disposable[]>, deactivate?: (ext: any) => void) {
  const wrapperActivate = async (context: vscode.ExtensionContext) => {
    const disposals: vscode.Disposable[] = []
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
