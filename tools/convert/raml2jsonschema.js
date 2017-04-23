require('shelljs/global');
config.verbose = true;

const path = require("path");
const raml1Parser = require('raml-1-parser');
const jsFile = require('jsonfile');

// get params
var folder = process.argv[2];

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
        rm('-f', schemaPath);
        rm('-f', errorsPath);

        // parse
        var api = raml1Parser.loadApiSync(f, { });       
        var japi =  api.toJSON();
        var errors = api.errors();  //((api.errors !== undefined) ? api.errors().toJSON() : undefined);

        // save schema and errors
        jsFile.writeFileSync(schemaPath, japi, {spaces: 2});
        if (errors.length > 0) {
            jsFile.writeFileSync(errorsPath, errors, {spaces: 2});
        }
});


/*
// delete json target 
jsonTarget = path.resolve(jsonTarget);
console.log(jsonTarget);
rm('-f', jsonTarget);

// generate schema
var ramlRoot = path.resolve(ramlSource);
console.log(ramlRoot);

var api = raml1Parser.loadApiSync(ramlRoot, {

});
console.log("loaded api");

var japi = api.toJSON();
//var sapi = JSON.stringify(japi, null, 2);
jsFile.writeFileSync(jsonTarget, japi, {spaces: 2});
*/

console.log("finito");
