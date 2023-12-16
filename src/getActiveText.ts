import { getActiveTextEditor } from './getActiveTextEditor'

export function getActiveText() {
  const activeTextEditor = getActiveTextEditor()
  if (activeTextEditor)
    return activeTextEditor.document.getText()
}
