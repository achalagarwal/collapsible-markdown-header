// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "collapsible-markdown-headers" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.collapse_header', () => {
		// The code you place here will be executed every time your command is executed
		let editor = vscode.window.activeTextEditor;
		if (editor){
			let document = editor.document;
			let header_text = '';
			let selection = editor.document.getWordRangeAtPosition(
				editor.selection.start);
			let position = editor.selection.active;
			if (selection){
				header_text = editor.document.getText(selection);
				position = new vscode.Position(editor.selection.active.line + 1, 0);
			}
			if(!header_text){
				let line = editor.selection.active.line;
				if(line){
					line = line - 1;
		
					let textLine = document.lineAt(line);
					if(textLine){
						let text = textLine.text;
						if (text){
							text = text.replace(/[^a-z\s0-9+]+/gi, '');
							header_text = text;
						}
					}
				}

				if(!header_text){
					header_text = '';
				}
			}
			let string = "<details>\n<summary> " + header_text + " </summary>\n</details>";
			// position = editor.selection.active;
			editor.edit(editBuilder => {
				editBuilder.insert(position, string);
			});
			
		}
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Achals World!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
