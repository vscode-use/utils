<p align="center">
<img src="./assets/kv.png" alt="vscode-use/utils">
</p>
<p align="center"> <a href="./README.md">English</a> | 简体中文</p>
# @vscode-use/utils

`@vscode-use/utils` 为 VS Code 扩展开发提供了一组类型友好的工具函数，覆盖命令、编辑器状态、选区、补全、终端、进度条以及响应式状态读取等常见场景。

## 📘 Documentation

- 文档站点：https://vscode-use-docs.netlify.app/
- npm：https://www.npmjs.com/package/@vscode-use/utils
- VS Code 启动模板：https://github.com/Simon-He95/vitesse-vscode
- 示例项目：https://github.com/Simon-He95/vitesse-vscode

## 📍 Install

```bash
pnpm add @vscode-use/utils
# 或
npm i @vscode-use/utils
```

## 为什么使用 @vscode-use/utils

- 为常见 VS Code API 提供更短、更聚焦的 typed wrapper。
- 统一处理编辑器文本、选区、可视区域、终端、文件和配置读写。
- 以更少样板代码创建 completion item、inline completion、code lens、hover 和 inlay hint。
- 通过 `useConfiguration`、`useDark`、`useSelection`、`useVisibleRange`、`useActiveTextEditor`、`useTheme` 获取响应式状态。

## 快速开始

```ts
import { addEventListener, createCompletionItem, message, registerCommand, useSelection } from '@vscode-use/utils'

registerCommand('demo.hello', () => {
  message.info('Hello from @vscode-use/utils')
})

addEventListener('text-save', () => {
  console.log('document saved')
})

const selection = useSelection()
console.log(selection.value?.text)

createCompletionItem({
  content: 'hello',
  detail: '示例补全项',
})
```

## 📝 API 概览

- registerCommand： ***注册指令***
- executeCommand： ***触发指令***
- getConfiguration： ***获取 workspace configuration***
- useConfiguration： ***响应式读取配置***
- message {type:'info'|'error',message:string,buttons:['ok']}： ***弹出消息***
- openFile： ***打开某一个文件***
- addEventListener： ***监听vscode中的文件切换、终端、内容变更、新增、删除等事件***
- createTerminal： ***快速创建一个终端***
- createCompletionItem： ***生成registerCompletionItemProvider的提示内容***
- registerCompletionItemProvider： ***根据输入生成对应的提示***
- isDark： ***判断当前vscode主题是否是dark***
- getSelection： ***获取当前鼠标所在行的信息***
- getActiveTextEditorLanguageId： ***获取当前文件的一个类型 javascriptreact | typescriptreact | vue 等***
- createProgress： ***创建一个vscode中的执行进度条***
- registerInlayHintsProvider： ***给出一个类似copilot的hint提示***
- getCopyText： ***读取粘贴板中的内容***
- setCopyText 往粘贴板中塞入内容***
- updateText： ***修改文本内容***
- replaceText： ***替换指定范围内的文本***
- deleteText： ***删除指定范围内的文本***
- jumpToLine： ***打开文件并跳转到某一行***
- createBottomBar： ***创建底部栏按钮***
- nextTick： ***修改文本内容更新后的回调***
- createSquare： ***创建一个方形小块***
- watchFiles： ***监听文件内容和删除的变化***
- createEvents： ***用于订阅事件通信的工具***
- getActiveText： ***获取到当前激活tab的文本内容***
- fold： ***折叠代码***
- unFold： ***展开代码***
- registerDefinitionProvider： ***提供了 option+click，实现快速跳转的功能***
- registerHoverProvider： ***为鼠标悬停提供回调***
- registerCodeActionsProvider ***注册代码动作提供程序***
- openExternalUrl： ***在浏览器中打开外部网址***
- getLineText： ***获取某一行的文本***
- useDark： ***响应式 dark 主题状态***
- useSelection： ***响应式选区状态***
- useVisibleRange： ***响应式可视区域状态***
- useActiveTextEditor： ***响应式当前激活编辑器状态***
- useTheme： ***主题信息获取和操作***
- isInPosition： ***判断一块区域是否是另一块的子区域***
- getCurrentFileUrl： ***获取当前激活文件的路径***
- createInput： ***创建一个输入框***
- getLocale： ***获取本地的语言环境***
- rename： ***快速给文件重命名***
- createDefinitionLocation ***创建按下 option 后左键点击后的跳转地址数据***
- setStyle ***给某一块区域增加样式***
- createStyle ***创建样式***
- getActiveTextEditor ***获取当前激活的编辑器***
- getKeyWords ***获取 position 位置处的关键词***
- setCommandParams ***设置 MarkdownString 的点击 command 参数***
- getOffsetFromPosition ***根据 position 计算 offset***
- getRootPath ***获取项目根目录路径***
- registerCodeLensProvider ***注册文本中头部的文字按钮并绑上事件***
- createCodeLens ***快速创建 provideCodeLenses 中的 item***
- saveFile ***保存文件***
- createStyleAnimation ***添加样式动画***
- createStyleAnimations ***添加样式动画组***
- getWordRangeAtPosition ***获取所在位置的关键词的区域***

## 📖 @vscode-use/utils api 说明

  ### 注册指令，需要在 package.json 中声明 右下角弹出提示
  ```
  registerCommand('vscode-use.hello', () => {
    message.info('Hello World!')
  })
  ```

  ### 注册指令，需要在 package.json 中声明 右下角弹出错误提示
  ```
  registerCommand('vscode-use.error', () => {
    message.error('Hello World!')
  })
  ```

  ### 注册指令，需要在 package.json 中声明 打开百度
  ```
  registerCommand('vscode-use.openExternalUrl', () => {
    openExternalUrl('http://www.baidu.com')
  })
  ```

  ### 获取当前语言
  ```
  const isZh = getLocale().includes('zh')
  message.info(`当前语言：${isZh ? '中文' : '英文'}`)
  ```

  ### 监听 切换活动的文本编辑器
  ```
  addEventListener('activeText-change', (e) => {})
  ```

  ### 监听 登录状态变化
  ```
  addEventListener('auth-change', (e) => {})
  ```

  ### 监听 配置变化（包括：插件配置、用户配置、工作区配置）
  ```
  addEventListener('config-change', (e) => {})
  ```

  ### 监听 编辑器可见性变化
  ```
  addEventListener('editor-visible', (e) => {})
  ```

  ### 监听 文件创建
  ```
  addEventListener('file-create', (e) => {})
  ```

  ### 监听 文件删除
  ```
  addEventListener('file-delete', (e) => {})
  ```

  ### 监听 文件夹创建和删除
  ```
  addEventListener('folder-change', (e) => {})
  ```

  ### 监听 文件重命名
  ```
  addEventListener('rename', (e) => {})
  ```

  ### 监听 选中内容变化
  ```
  addEventListener('selection-change', (e) => {})
  ```

  ### 监听 终端变化
  ```
  addEventListener('terminal-change', (e) => {})
  ```

  ### 监听 终端关闭
  ```
  addEventListener('terminal-close', (e) => {})
  ```

  ### 监听 终端创建
  ```
  addEventListener('terminal-open', (e) => {})
  ```

  ### 监听 文本修改
  ```
  addEventListener('text-change', (e) => {})
  ```

  ### 监听 新开文本
  ```
  addEventListener('text-open', (e) => {})
  ```

  ### 监听 文本保存
  ```
  addEventListener('text-save', (e) => {})
  ```

  ### 监听 文本可见性变化
  ```
  addEventListener('text-visible-change', (e) => {})
  ```

  ### 监听 主题变化
  ```
  addEventListener('theme-change', (e) => {})
  ```

  ### 跳到某个文件的某一行
  ```
  jumpToLine(10, 'path/Uri')
  ```

  ### 折叠起始行和结束行之间的所有行
  ```
  onFold([
    createRange([1, 0], [5, 0]),
    createRange([5, 0], [10, 0])
  ])
  ```

  ### 展开起始行和结束行之间的所有行
  ```
  unFold([
    createRange([1, 0], [5, 0]),
    createRange([5, 0], [10, 0])
  ])
  ```

  ### 更新文本
  ```
  updateText(edit=>{
  // 在第一行插入文本
  edit.insert(new vscode.Position(0, 0), 'Hello World!')

  // 删除第一行的前5个字符
  edit.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 5)))

  // 将第一行的前5个字符替换为 Hello World!
  edit.replace(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 5)), 'Hello World!')
  })
  ```

  ### 获取当前激活的编辑器文本
  ```
  const activeText = getActiveText()
  ```

  ### 获取某一行的文本
  ```
  const lineText = getLineText(0)
  ```

  ### 读取config
  ```
   const mode1 = getConfiguration('vscode-use').get('mode')
   const mode2 = getConfiguration('vscode-use.mode')
  ```

  ### 更新config
  ```
  setConfiguration('vscode-use.mode', 'dev')
  ```

  ### 创建终端
  ```
  createTerminal('test')
  ```

  ### 创建底部栏
  ```
  createBottomBar({
    position: 'left',
    text: '我是底部栏',
    color: '#fff',
    backgroundColor: '#000',
  })
  ```

  ### 根据offset获取位置
  ```
  const pos = getPosition(100)
  ```

  ### 获取copy的内容
  ```
  getCopyText().then(text=>{})
  ```

  ### 往剪贴板写入内容
  ```
  setCopyText('Hello World!')
  ```

  ### 获取当前激活文本的路径
  ```
  const currentFileUrl = getCurrentFileUrl()
  ```

  ### 设置选中内容
  ```
  setSelection([0, 0], [0, 5])
   ```

  ### 设置多选
  ```
  setSelections([{
    start: [0, 0],
    end: [0, 5],
    position: 'left' // 控制光标位置
  }, {
    start: [1, 0],
    end: [1, 5],
    position: 'right'
  }])
  ```

  ###  监听文件变化
  ```
  const watcher = watchFiles(['filepath'], {
    onChange: (e) => {},
  })

  watcher.dispose()
  ```

  ### 创建进度条
  ```
  createProgress({
    title: '进度条',
    async done(report) {
      report({
        message: '进度条完成 10%',
        increment: 10
      })
      setTimeout(() => {
        report({
          message: '进度条完成 50',
          increment: 50
        })
      })
    }
  })
  ```

  ### 创建选择框
  ```
  createSelect(['vue','react','svelte','solid']).then((res)=>{})
  ```

  ### 监听hover元素的事件
  ```
  registerHoverProvider('vue', (e) => {})
  ```

  ### 监听按下option键时控制点击跳转位置
  ```
  registerDefinitionProvider('vue', (e) => {})
  ```

  ### 获取主题相关api
  ```
  const { getCurrentTheme, getAllTheme, setTheme, } = useTheme()
  ```

  ### 获取当前激活文本的语言
  ```
  const language = getActiveTextEditorLanguageId() // vue
  ```

  ### 重命名文件
  ```
  rename('url', 'newUrl')
  ```

  ### nextTick，一些针对文件变化后的操作，需要等待文件变化后再执行
  ```
   nextTick(()=>{})
  ```

  ### 添加样式
  ```
  setStyle(createStyle({
    backgroundColor: 'yellow',
    border: '1px solid red'
  }), createRange([0, 0], [0, 10]))
  ```
  ### 创建输入框
  ```
  createInput({
    title: '我是输入框',
    placeholder: '请输入内容',
    value: ''
  })
  ```

  ### 获取当前激活的编辑器

  ```
  const activeTextEditor = getActiveTextEditor()
  ```

  ### 获取position位置的关键词

  ```
  const keyWords = getKeyWords(position)
  ```

  ### 设置MarkdownString的点击command参数

  ```
  const md = new vscode.MarkdownString()
  md.isTrusted = true
  md.supportHtml = true
  const commandUri = `command:a.b?${setCommandParams(['params1', 'params2'])}`
  md.appendMarkdown(`[🦘](${commandUri})`);
  ```

  ### getOffsetFromPosition
  ```
  const offset = getOffsetFromPosition(position) // 获取当前文本，位置的offset
  const offset = getOffsetFromPosition(position,code) // 获取指定code，位置的offset
  ```

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
