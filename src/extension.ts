import * as vscode from 'vscode';

const Cursor = {
    Up: "cursorUp",
    Down: "cursorDown",
    Left: "cursorLeft",
    Right: "cursorRight"
};
Object.freeze(Cursor);

// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('cppcurlyformatter.curlyformat', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor)
            return false;

        if (!isCursorAtZeroPosition(editor) && isCursorBetweenCurly(editor))
            manualFormat();
        else
            autoCompleteOrNewLine(editor);
    });
    context.subscriptions.push(disposable);
}

async function autoCompleteOrNewLine(editor: vscode.TextEditor) {
    var cursorPos = editor.document.offsetAt(editor.selection.active);
            if (hasSuggestionOnEnter()) {
                await vscode.commands.executeCommand("acceptSelectedSuggestion");

                if (cursorPos != editor.document.offsetAt(editor.selection.active))
                    return;
            }
            type('\n');
            convertIndentation();
}

export function deactivate() { }

function isCursorAtZeroPosition(editor: vscode.TextEditor) {
    const cursorPosition = editor.selection.active;
    return cursorPosition.character == 0;
}

function isCursorBetweenCurly(editor: vscode.TextEditor) {
    const nearCursor = getAdjacentText(editor);
    return nearCursor[0] == "{" && nearCursor[1] == "}";

    function getAdjacentText(editor: vscode.TextEditor) {
        const cursorPosition = editor.selection.active;
        return editor.document.getText(
            vsRange(cursorPosition.line, cursorPosition.character - 1, cursorPosition.character + 1)
        );

        function vsRange(line: number, from: number, to: number) {
            return new vscode.Range(line, from, line, to);
        }
    }
}

function manualFormat() {
    move(Cursor.Left);
    type('\n');
    move(Cursor.Right);
    type('\n\n');
    move(Cursor.Up);
    indent();
}

function indent() {
    if (hasAutoTab()) {
        type('\t');
    }
    else {
        const app = vscode.workspace.getConfiguration("editor").get<number>("tabSize");
        var tabSize = 4;

        if (typeof app === "number")
            tabSize = app;

        for (var i = 0; i < tabSize; i++)
            type(' ');
    }
}

function convertIndentation() {
    if (hasAutoTab())
        vscode.commands.executeCommand("editor.action.indentationToTabs");
    else
        vscode.commands.executeCommand("editor.action.indentationToSpaces");
}

function hasAutoTab() {
    return vscode.workspace.getConfiguration("cppcurlyformatter").get("autoTabIndentation");
}

function hasSuggestionOnEnter() {
    return vscode.workspace.getConfiguration("editor").get("acceptSuggestionOnEnter");
}

function type(text: string) {
    vscode.commands.executeCommand('type', { "text": text });
}

function move(dir: string) {
    vscode.commands.executeCommand(dir);
}
