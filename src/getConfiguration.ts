import * as vscode from 'vscode'

export function getConfiguration(name: string) {
  const [scopedName, propName] = name.split('.')

  return propName
    ? vscode.workspace.getConfiguration(scopedName).get(propName)
    : vscode.workspace.getConfiguration(name)
}
