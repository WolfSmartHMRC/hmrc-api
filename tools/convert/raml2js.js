require('shelljs/global');
config.verbose = true;

const path = require("path");
const raml1Parser = require('raml-1-parser');
const jsFile = require('jsonfile');
const gen = require('raml-javascript-generator/dist');

// get params
var targetFolder = '..\bosh';
//var folder = process.argv[2];
var folder = [
    'apis/SA'
];

// iterate raml folders in file
find(folder)
    .filter(f => {
        return f.match(/\.raml$/);
    })
    .forEach((f) => {
        console.log(f);

        var dir = path.dirname(f);
        var filePath = path.basename(f, '.raml');
        var schemaPath = path.join(dir, filePath+'.'+'json');
        var errorsPath = path.join(dir, filePath+'.errors.'+'json');

        // delete previous
        //rm('-f', schemaPath);
        //rm('-f', errorsPath);

        // parse
        var api = raml1Parser.loadApiSync(f, { });       
        var japi =  api.toJSON();
        var errors = api.errors();  //((api.errors !== undefined) ? api.errors().toJSON() : undefined);

        // stop on errors
        //jsFile.writeFileSync(schemaPath, japi, {spaces: 2});
        if (errors.length > 0) {
             jsFile.writeFileSync(errorsPath, errors, {spaces: 2});
             return -1;
        }

        var x = gen.client(japi, {
            output: targetFolder
        })
});

console.log("finito");
