require('shelljs/global');
config.verbose = true;

const fs = require("fs");
const path = require("path");
const raml1Parser = require('raml-1-parser');
const jsFile = require('jsonfile');
//const conv = require('api-spec-converter');
const conv = require('api-spec-transformer');

// get params
//var folder = process.argv[2];
var folder = [
    //'apis/SA',
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
        var docPath = path.join(dir, filePath+'.oas.'+'yaml');
        //var docPath = path.join(dir, filePath+'.oas.'+'json');
        var errorsPath = path.join(dir, filePath+'.oas.errors.'+'json');

        // delete previous
        rm('-f', docPath);
        rm('-f', errorsPath);

        // convert
        /* 0.8 doh!
        conv.convert({
            from: 'raml',
            to: 'swagger_2',
            source: f
        }, (err, converted) => {
            if (converted !== undefined) {
                fs.writeFileSync(docPath, converted.stringify());
            }
            if (err !== undefined) {
                fs.writeFileSync(errorsPath, err);
            }
        });
        */

        var ramlToSwagger = new conv.Converter(conv.Formats.RAML10, conv.Formats.SWAGGER);
        
        ramlToSwagger.loadFile(f, function(err) {
        if (err) {
            jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            return;
        }
        
        ramlToSwagger.convert('yaml')
            .then(function(convertedData) {
                fs.writeFileSync(docPath, h);
            })
            .catch(function(err){
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
            });
        });        
    });

console.log("finito");