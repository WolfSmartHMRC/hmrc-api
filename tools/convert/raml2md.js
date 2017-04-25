require('shelljs/global');
config.verbose = true;

const fs = require("fs");
const path = require("path");
const raml1Parser = require('raml-1-parser');
const jsFile = require('jsonfile');
const raml2html = require('raml2html');

// get params
//var folder = process.argv[2];
var folder = [
    'apis/SA',
    'apis/agentClientAuthorisation'
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
        var docPath = path.join(dir, filePath+'.'+'md');
        var errorsPath = path.join(dir, filePath+'.2mderrors.'+'json');

        // delete previous
        rm('-f', docPath);
        rm('-f', errorsPath);

        // convert
        raml2html.render(f, raml2html.getConfigForTheme('raml2html-markdown-theme'))
            .then(h => {
                fs.writeFileSync(docPath, h);
            }, (err) => {
                console.log(err);
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            })
            .catch((ex) => {
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            }) ;           
});

console.log("finito");