# C++ Curly Formatter
This is fork of [`C# curly formatter`](https://github.com/Ironcutter24/cs-curly-formatter), so all thanks to original author, i changed few lines only
> but for me strange that this problem actual

[![Visual Studio](https://img.shields.io/badge/Visual%20Studio%20Marketplace-5C2D91.svg?style=flat&logo=visual-studio&logoColor=white)](https://marketplace.visualstudio.com/manage/publishers/yashelter/extensions/cppcurlyformatter)

Maps `Enter` key to formatting actions:
1. Force curly bracket on new line
2. Keep tab indentation on previous lines

Download [here](https://marketplace.visualstudio.com/manage/publishers/yashelter/extensions/cppcurlyformatter/)

## Building 
### Linux (Manjaro)
```bash
sudo pamac install yarn npm nodejs 
yarn
yarn run compile
sudo npm install -g @vscode/vsce
vsce package
```