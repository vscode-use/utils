<p align="center">
<img src="./assets/kv.png" alt="css selector">
</p>
<p align="center"> <a href="./README.md">English</a> | 简体中文</p>
🐰 这个库是为了快速在 vscode 插件中使用一些常用的命令

## 📍 Install
```
npm i @vscode-use/utils -d
```

## 📝 Api

- registerCommand： ***注册指令***
- executeCommand： ***触发指令***
- getConfiguration： ***获取 workspace configuration***
- message {type:'info'|'error',message:string,buttons:['ok']}： ***弹出消息***
- openFile： ***打开某一个文件***
- addEventListener： ***监听vscode中的文件切换、终端、内容变更、新增、删除等事件***
- createTerminal： ***快速创建一个终端***
- createCompletionItem： ***生成registerCompletionItemProvider的提示内容***
- registerCompletionItemProvider： ***根据输入生成对应的提示***
- isDark： ***判断当前vscode主题是否是dark***
- getSelection： ***获取当前鼠标所在行的信息***
- getActiveTextEditorLanguageId： ***获取当前文件的一个类型javascriptreact | typescriptreact | vue 等***
- createProgress： ***创建一个vscode中的执行进度条***
- registerInlayHintsProvider： ***给出一个类似copilot的hint提示***
- getCopyText： ***读取粘贴板中的内容***
- setCopyText 往粘贴板中塞入内容***
- updateText： ***修改文本内容***
- jumpToLine： ***打开文件并跳转到某一行***
- createBottomBar： ***创建底部栏按钮***
- nextTick： ***修改文本内容更新后的回调***
- createSquare： ***创建一个方形小块***
- watchFiles： ***监听文件内容和删除的变化***
- createEvents： ***用于订阅事件通信的工具***
- getActiveText： ***获取到当前激活tab的文本内容***
- fold： ***折叠代码***
- unFold： ***展开代码***
- registerDefinitionProvider： ***提供了option+点击，实现快速跳转的功能***
- registerHoverProvider： ***为鼠标悬停提供回调***
- openExternalUrl： ***在浏览器中打开外部网址***
- getLineText： ***获取某一行的文本***
- useTheme： ***主题信息获取和操作***
- isInPosition： ***判断一块区域是否是另一块的子区域***
- getCurrentFileUrl： ***获取当前激活文件的路径***
- createInput： ***创建一个输入框***
- getLocale： ***获取本地的语言环境***
- rename： ***快速给文件重命名***
- createDefinitionLocation ***创建按下option后左键点击后的跳转地址数据***
- setStyle ***给某一块区域增加样式***
- createStyle ***创建样式***
- 
## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
