import { getActiveTextEditor } from './getActiveTextEditor'

export function getActiveTextEditorLanguageId() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.languageId
}
