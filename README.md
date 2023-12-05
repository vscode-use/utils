<p align="center">
<img src="./assets/kv.png" alt="vscode-use/utils">
</p>
<p align="center"> English | <a href="./README_zh.md">简体中文</a></p>

🐰 This library is designed to quickly use some common commands in the vscode plug-in

## 📍 Install
```
npm i @vscode-use/utils -d
```

## 📝 Api

- registerCommand： ***Registration instructions***
- executeCommand： ***Trigger instructions***
- getConfiguration： ***get workspace configuration***
- message {type:'info'|'error',message:string,buttons:['ok']}： ***Pop up message***
- openFile： ***Open a file.***
- addEventListener： ***Listen to file switching, terminal, content change, add, delete and other events in vscode***
- createTerminal： ***Quickly create a terminal***
- createCompletionItem： ***Generate the prompt content of registerCompletionItemProvider***
- registerCompletionItemProvider： ***Generate the corresponding prompt according to the input***
- isDark： ***Determine whether the current vscode theme is dark***
- getSelection： ***Get the information of the line where the current mouse is located***
- getActiveTextEditorLanguageId： ***Get a type of the current file javascriptreact | typescriptreact | vue, etc.***
- createProgress： ***Create an execution progress bar in vscode***
- registerInlayHintsProvider： ***Give a hint similar to copilot.***
- getCopyText： ***Read the pasteboard Content.***
- setCopyText： ***Plug the content into the pasteboard.***
- updateText： ***Modify the text content***
- jumpToLine： ***Open a file and jump to a certain line***
- createBottomBar： ***Create the bottom bar button***
- nextTick： ***Create the bottom bar button***
- createSquare： ***Create a square block***
- watchFiles： ***Monitor changes in file content and deletion***
- createEvents： ***Tools for subscribing to event communication***
- getActiveText： ***Get the text content of the current activation tab***
- fold： ***fold code***
- unFold： ***unfold code***
- registerDefinitionProvider： ***It provides option + click to achieve the function of fast jump.***
- registerHoverProvider： ***Provide a callback for mouse hover***
- openExternalUrl： ***Open the external url in the browser***
- getLineText： ***Get the text of a certain line***
- useTheme： ***Theme Configuration and Operatation***
- isInPosition： ***Determine whether one area is a sub-area of another***
- getCurrentFileUrl： ***Get the path of the current activation file***
- createInput： ***Create an input box***
- getLocale： ***Get the local language environment***
- rename： ***Quickly rename files***


## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>
