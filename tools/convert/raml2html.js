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
    'apis/agent/clientAuthorisation'
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
        var htmlPath = path.join(dir, filePath+'.'+'html');
        var errorsPath = path.join(dir, filePath+'.2htmlerrors.'+'json');

        // delete previous
        rm('-f', htmlPath);
        rm('-f', errorsPath);

        // convert
        raml2html.render(f, raml2html.getConfigForTheme())
            .then(h => {
                fs.writeFileSync(htmlPath, h);
            }, (err) => {
                console.log(err);
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            })
            .catch((ex) => {
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            }) ;           
});

console.log("finito");
