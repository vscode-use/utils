import * as vscode from 'vscode'

function getCurrentTheme() {
  const config = vscode.workspace.getConfiguration()
  return config.get('workbench.colorTheme') as string
}

function getAllTheme() {
  const extensions = vscode.extensions.all
  const themeColors: { label: string, path: string, id: string, uiTheme: string }[] = []

  // 遍历所有已安装的扩展
  for (const extension of extensions) {
    const packageJSON = extension.packageJSON

    // 检查扩展是否定义了主题色
    if (packageJSON && packageJSON.contributes && packageJSON.contributes.themes) {
      const themes = packageJSON.contributes.themes

      // 遍历扩展中的主题色
      for (const theme of themes) {
        if (theme.label && theme.path)
          themeColors.push(theme)
      }
    }
  }

  return themeColors
}

function setTheme(theme: string) {
  const config = vscode.workspace.getConfiguration()
  return Promise.all(
    [
      config.update('workbench.colorTheme', theme, vscode.ConfigurationTarget.Global),
      config.update('workbench.preferredLightColorTheme', theme, vscode.ConfigurationTarget.Global),
      config.update('workbench.preferredDarkColorTheme', theme, vscode.ConfigurationTarget.Global),
    ],
  )
}

/**
 * 获取和操作当前主题色相关信息
 * @returns 主题色相关操作
 */
export function useTheme() {
  return {
    getCurrentTheme,
    getAllTheme,
    setTheme,
  }
}
