import { getActiveTextEditor } from './getActiveTextEditor'
export function getLineText(lineNumber: number) {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.lineAt(lineNumber).text
}
