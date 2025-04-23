import type { ProgressOptions } from './types'
import * as vscode from './vscode-shim'

export function createProgress(options: ProgressOptions) {
  const { title, location = vscode.ProgressLocation.Notification, cancellable = false, cancel, done } = options
  return vscode.window.withProgress({
    location,
    title,
    cancellable,
  }, (progress, token) => {
    token.onCancellationRequested(() => cancel && cancel())
    progress.report({ increment: 0 })
    return done(progress.report.bind(progress))
  })
}
