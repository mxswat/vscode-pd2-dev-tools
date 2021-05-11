const readline = require('readline');
const fs = require('fs')

const readInterfaceHashlistLua = readline.createInterface({
    // README: THE OUTPUT OF THE .PS1 FILE IS UTF8 WITH BOM USE VSCODE TO SAVE IT TO NORMAL UTF8
    input: fs.createReadStream('hashlist_clean.txt', { encoding: 'utf8' }),
    output: process.stdout,
    console: false
});

// TODO: ADD EXCEPTIONS LIST eg: projectilestweakdata.lua

const output_xml = {}
const output_json = {}

function templateBuilderHooksXML(path) {
    const filename = path.substr(path.lastIndexOf('/') + 1);
    output_xml[`Hook for ${path}`] = {
        prefix: `hook_${filename}`,
        body: [
            `<hook file="\${1:${filename}}.lua" source_file="${path}"/>`,
            "$2"
        ]
    }
}

function templateBuilderHooksJSON(path) {
    const filename = path.substr(path.lastIndexOf('/') + 1);
    output_json[`Hook for ${path}`] = {
        prefix: `hook_${filename}`,
        body: [
            `{"script_path" : "\${1:${filename}}.lua",		 	"hook_id" : "${path}"},`,
            "$2"
        ]
    }
}


readInterfaceHashlistLua.on('line', (line) => {
    templateBuilderHooksXML(line)
    templateBuilderHooksJSON(line)
});

readInterfaceHashlistLua.on('close', () => {
    console.log('Done!');

    fs.writeFile('../snippets/xml-snippets.code-snippets', JSON.stringify(output_xml, null, 2), { encoding: 'utf8' }, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });

    fs.writeFile('../snippets/json-snippets.code-snippets', JSON.stringify(output_json, null, 2), { encoding: 'utf8' }, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
});


const AddFilesBase = [
    'unit_obj',
    'unit_tex',
    'unit_seq',
    'unit_mat',
    'unit_mat_seq',
    'unit_obj_seq',
    'unit_thq',
    'unit_mat_thq',
    'unit_npc',
    'unit_cc',
    'unit_mat_cc',
    'df_nm',
    'df_nm_cc',
    'df_nm_cc_gsma',
    'df_nm_gsma',
    'unit',
    'texture',
    'dds',
    'png',
    'tga',
    'bik',
    'movie',
    'object',
    'material_config',
    'sequence_manager',
    'cooked_physics ',
    'effect',
    'environment',
    'mission',
    'continent',
    'world',
]

const output_main_mx = {}

AddFilesBase.forEach((nameId) => {
    output_main_mx[`AddFile - ${nameId}`] = {
        prefix: nameId,
        body: [
            `<${nameId} path="$1"/>`,
            "$2"
        ]
    }
})

fs.writeFile('../snippets/main-xml-snippets.code-snippets', JSON.stringify(output_main_mx, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

const weapons_based_on = {}
const rawdata = fs.readFileSync('./weapons.json');
const weaponsJSON = JSON.parse(rawdata);

weaponsJSON.forEach((obj) => {
    weapons_based_on[`${obj.name}`] = {
        prefix: `wbased_on_${obj.id}`,
        body: [
            `based_on="${obj.id}"`,
        ]
    }
})

fs.writeFile('../snippets/based-on-weapon-xml-snippets.code-snippets', JSON.stringify(weapons_based_on, null, 2), { encoding: 'utf8' }, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});