const readline = require('readline');
const fs = require('fs')

const readInterface = readline.createInterface({
    input: fs.createReadStream('hashlist_clean.txt', { encoding: 'utf8' }),
    output: process.stdout,
    console: false
});

const output = {

}

// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
// README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8

function templateBuilder(path) {
    const filename = path.substr(path.lastIndexOf('/') + 1);
    output[`Hook for ${path}`] = {
        prefix: `bl_${filename}`,
        body: [
            `<hook file="${filename}.lua" source_file="${path}"/>`,
            "$2"
        ]
    }
}

readInterface.on('line', (line) => {
    templateBuilder(line)
    console.log(`Done line: ${line}`);
});

readInterface.on('close', () => {
    console.log('Done!');

    fs.writeFile('../snippets/xml-snippets.code-snippets', JSON.stringify(output,null, 2), {encoding:'utf8'}, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});
