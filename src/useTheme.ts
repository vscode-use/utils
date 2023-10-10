import * as vscode from 'vscode'
function getCurrentTheme() {
  const config = vscode.workspace.getConfiguration()
  return config.get('workbench.colorTheme') as string
}

function getAllTheme() {
  const extensions = vscode.extensions.all
  const themeColors = []

  // 遍历所有已安装的扩展
  for (const extension of extensions) {
    const packageJSON = extension.packageJSON

    // 检查扩展是否定义了主题色
    if (packageJSON && packageJSON.contributes && packageJSON.contributes.themes) {
      const themes = packageJSON.contributes.themes

      // 遍历扩展中的主题色
      for (const theme of themes) {
        if (theme.label && theme.path) {
          themeColors.push({
            label: theme.label,
            path: theme.path,
            id: theme.id,
          })
        }
      }
    }
  }

  return themeColors
}

function setTheme(theme: string) {
  const config = vscode.workspace.getConfiguration()
  return config.update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global)
}

export function useTheme() {
  return {
    getCurrentTheme,
    getAllTheme,
    setTheme,
  }
}
