// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function countHeaderHashes(line: string){
	if(line === "")
		{return 0;}
	if(line===null)
		{return 0;}
	for (var i = 0; i < line.length; i++) {
		if (line.charAt(i) !=="#")
			{return i;}
	}
	return line.length;
		
}

export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "collapsible-markdown-headers" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	// let disposable_exp = vscode.commands.registerCommand('extension.collapse_header_detect_endpoint', () => {
	// 	let editor = vscode.window.activeTextEditor;

	// 	if(editor){
	// 		if (editor){
	// 			let document = editor.document;
	// 			let header_text = '';
	// 			let selection = editor.document.getWordRangeAtPosition(
	// 				editor.selection.start);
	// 			let position = editor.selection.active;
	// 			if (selection){
	// 				header_text = editor.document.getText(selection);
	// 				position = new vscode.Position(editor.selection.active.line + 1, 0);
	// 			}
	// 			if(!header_text){
	// 				let line = editor.selection.active.line;
	// 				if(line){
	// 					line = line - 1;
			
	// 					let textLine = document.lineAt(line);
	// 					if(textLine){
	// 						let text = textLine.text;
	// 						if (text){
	// 							text = text.replace(/[^a-z\s0-9+]+/gi, '');
	// 							header_text = text;
	// 						}
	// 					}
	// 				}

	
	// 				if(!header_text){
	// 					header_text
	// 					let options: vscode.InputBoxOptions = {
	// 						prompt: "Name your collapsible header",
	// 						placeHolder: ""
	// 					}
	// 					vscode.InputBoxOptions()
	// 					vscode.Inpu
	// 					vscode.window.showInputBox(vscode.Inp)
	// 					header_text = '';
	// 				}
	// 			}
	// 			let string = "<details>\n<summary> " + header_text + " </summary>\n</details>";
	// 			// position = editor.selection.active;
	// 			editor.edit(editBuilder => {
	// 				editBuilder.insert(position, string);
	// 			});
				
	// 		}
	// 	}

	// });

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

	let disposable_second = vscode.commands.registerCommand('extension.collapse_header_detect_endpoint',  () => {
		// The code you place here will be executed every time your command is executed
		let editor = vscode.window.activeTextEditor;
		if (editor){
			let document = editor.document;

			// the values of the header text and number of hashes
			let header_text = '';
			let header_count = 0;

			let selection = editor.document.getWordRangeAtPosition(
				editor.selection.start);
			let position = editor.selection.active;
			
			// if text has been selected, we use that as header for collapsible
			if (selection){
				header_text = editor.document.getText(selection);
				position = new vscode.Position(editor.selection.active.line + 1, 0);
			}

			// otherwise we check the line above for help
			if(!header_text){
				let line = editor.selection.active.line;
				if(line){
					line = line - 1;
		
					let textLine = document.lineAt(line);
					if(textLine){
						let text = textLine.text;
						// here I need to keep going up until end
						// start of doc
						// and find the first header section

						if (text){

							header_count = countHeaderHashes(text);
							text = text.replace(/[^a-z\s0-9+]+/gi, '');
							header_text = text;
						}
					}
				}
				
				// assuming that selection.text or 
				// replace might result in undefined
				// or something we add later might result
				// in an undefined header_text

				if(!header_text){
					header_text = '';
				}


				let options: vscode.InputBoxOptions = {
					prompt: "Title your collapsible header",
					value: header_text,
				};
				
				let title_text = header_text;
				vscode.window.showInputBox(options).then(
					function(input){
						let editor = vscode.window.activeTextEditor;
						// let document = editor?.document;
						if(input && editor){
							// let selection = editor.document.getWordRangeAtPosition(
							// 	editor.selection.start);
							let position = editor.selection.active;
							title_text = input;
							if(header_count === 0){
								let string = "\n<details>\n\n<summary> "
												+ title_text + 
											" </summary>\n</details>";
								editor.edit(editBuilder => {
									editBuilder.insert(position, string);
								});
							}
							else{
								let string = "\n<details>\n\n<summary> "
												+ title_text +
											 " </summary>\n";
								let last_line = editor.document.lineCount;
								let document = editor.document;
								editor.edit(editBuilder => {
									editBuilder.insert(position, string);
								
								// if(editor){
								string = "</details>\n\n";
								// let last_line = editor.document.lineCount;
								let flag = false;
								if(header_count === 1){
									line = last_line+1;
									position = new vscode.Position(line, 0);
									editBuilder.insert(position, string);
									// editor.edit(editBuilder => {
									// 	editBuilder.insert(position, string);
									// });
									flag = true;

								}
								
								// now we go search for a spot
								// where the header hashes is less or equal to 
								// current header hashes (header_count)
								else {
									line = position.line;
									while(line <= last_line ){
										let currentText = document.lineAt(line).text;

										position = new vscode.Position(line, 0);
										let currentCount = countHeaderHashes(currentText);
										if (currentCount <= header_count && currentCount>0){
											editBuilder.insert(position, string);
											// editor.edit(editBuilder => {
											// 	editBuilder.insert(position, string);
											// });
											flag = true;
											break;
										}
										line++;
									}
									if (flag === false){
									line = last_line+1;
									position = new vscode.Position(line, 0);
									editBuilder.insert(position, string);
									// editor.edit(editBuilder => {
									// 	editBuilder.insert(position, string);
									// });
								}

								}
							// }
							});

								
								// we need to put this above a header section that has
								// less or equal hashes
								
							}
							// position = editor.selection.active;
							
						}
					}
				);
				// header_text = '';

			}
			// let string = "<details>\n<summary> " + header_text + " </summary>\n</details>";
			// // position = editor.selection.active;
			// editor.edit(editBuilder => {
			// 	editBuilder.insert(position, string);
			// });
			
		}
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Achals World!');
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable_second);
}

// this method is called when your extension is deactivated
export function deactivate() {}
