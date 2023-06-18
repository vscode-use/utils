<p align="center">
<img src="./assets/kv.png" alt="css selector">
</p>
<p align="center"> <a href="./README.md">English</a> | 简体中文</p>
> WIP: 这个库是为了快速在 vscode 插件中使用一些常用的命令

## Api

- registerCommand ***注册指令***
- getConfiguration ***获取 workspace configuration***
- message {type:'info'|'error',message:string,buttons:['ok']} ***弹出消息***
- openFile ***打开某一个文件***
- addEventListener ***监听vscode中的文件切换、终端、内容变更、新增、删除等事件***
- createTerminal ***快速创建一个终端***
- createCompletionItem ***生成registerCompletionItemProvider的提示内容***
- registerCompletionItemProvider ***根据输入生成对应的提示***
- isDark ***判断当前vscode主题是否是dark***
- getSelection ***获取当前鼠标所在行的信息***
- getActiveTextEditorLanguageId ***获取当前文件的一个类型javascriptreact | typescriptreact | vue 等***
- createProgress ***创建一个vscode中的执行进度条***

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
