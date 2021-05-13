const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// console.log('"pd2-dev-tools" is now active!');

	let build_old_fnc = vscode.commands.registerCommand('pd2-dev-tools.build_old_fnc', buildOldFunction);
	context.subscriptions.push(build_old_fnc);
	
	let build_post_hook = vscode.commands.registerCommand('pd2-dev-tools.build_post_hook', buildPostHook);
	context.subscriptions.push(build_post_hook);

	let build_pre_hook = vscode.commands.registerCommand('pd2-dev-tools.build_pre_hook', buildPreHook);
	context.subscriptions.push(build_pre_hook);
}

function deactivate() { }

// Common functions

function getFunctionData() {
	const activeEditor = vscode.window.activeTextEditor
	const { text } = activeEditor.document.lineAt(activeEditor.selection.active.line);
	const functionParserRegex = /(function) (\w.*)(:|\.)(.*)\((.*)\)/g;
	const match = functionParserRegex.exec(text);
	if (!match) {
		vscode.window.showErrorMessage(`Cannot generate from ${text}`);
		throw new Error('Invalid Text')
	}
	return match
}

function notifyAndCopyToclip(output, className, functionName) {
	vscode.env.clipboard.writeText(output)
	vscode.window.showInformationMessage(`Generated from ${className}:${functionName}`);
}

// Common functions END

function buildOldFunction() {
	const data = getFunctionData()
	const output = functionBuilder(data[2], data[4], data[5])
	notifyAndCopyToclip(output, data[2], data[4])
}

function functionBuilder(className, functionName, parameters) {
	return `
local old_${className}_${functionName} = ${className}.${functionName}
function ${className}:${functionName}(${parameters})
	local result = old_${className}_${functionName}(${parameters ? `self, ${parameters}` : 'self'})
	-- code
	return result
end
`
}

function buildPostHook() {
	const data = getFunctionData()
	const output = HookBuilder(data[2], data[4], data[5], 'PostHook')
	notifyAndCopyToclip(output, data[2], data[4])
}

function buildPreHook() {
	const data = getFunctionData()
	const output = HookBuilder(data[2], data[4], data[5], 'PreHook')
	notifyAndCopyToclip(output, data[2], data[4])
}

function HookBuilder(className, functionName, parameters, type) {
	return `
Hooks:${type}(${className}, "${functionName}", "CHANGEME_${className}_${functionName}", function(${parameters ? `self, ${parameters}` : 'self'})
	-- code
end)`
}


module.exports = {
	activate,
	deactivate
}
