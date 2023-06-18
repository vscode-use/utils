<p align="center">
<img src="./assets/kv.png" alt="vscode-use/utils">
</p>
<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>

> WIP: This library is designed to quickly use some common commands in the vscode plug-in

## Api

- registerCommand ***Registration instruction***
- getConfiguration ***achieve workspace configuration***
- message {type:'info'|'error',message:string,buttons:['ok']} ***popup message***
- openFile ***open file***
- addEventListener ***listen vscode file switching, terminal, content change, add, delete and other events***
- createTerminal ***Quickly create a terminal***
- createCompletionItem ***Generate the prompt content for the register completion item provider***
- registerCompletionItemProvider ***Generate a prompt based on the input***
- isDark ***Determine if the current vscode theme is dark***
- getSelection ***Gets information about the current mouse row***
- getActiveTextEditorLanguageId ***Gets a type of the current file like javascriptreact | typescriptreact | vue 等***
- createProgress ***Create an execution progress bar in vscode***

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
