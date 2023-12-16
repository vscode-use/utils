import { getActiveTextEditor } from './getActiveTextEditor'

export function getCurrentFileUrl() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.uri.fsPath
}
