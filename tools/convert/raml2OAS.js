require('shelljs/global');
config.verbose = true;

const fs = require("fs");
const path = require("path");
const raml1Parser = require('raml-1-parser');
const jsFile = require('jsonfile');
//const conv = require('api-spec-converter');   // -1
//const conv = require('api-spec-transformer');   // -1
const conv = require('oas-raml-converter');  

// get params
//var folder = process.argv[2];
var folder = [
    'apis/SA'
    //'apis/agentClientAuthorisation'
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
        /*  api-spec-converter 0.8 doh!
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

        var ramlToSwagger = new conv.Converter(conv.Formats.RAML10, conv.Formats.OAS);
        console.log('Created Converter');

        var x = ramlToSwagger.loadFile(f, (err) => {
            if (err) {
                console.log('Error loading '+f+'@'+err);
                jsFile.writeFileSync(errorsPath, err, {spaces: 2});
                return;
            }
        });
        console.log('Loaded '+f);
        
        ramlToSwagger.convert('yaml')
            .then((convertedData) => {
                fs.writeFileSync(docPath, h);
                console.log("finito OK");
            })
            .catch((err) => {
                var x = JSON.stringify(err, null, 2)
                fs.writeFileSync(errorsPath, x);
                console.log("finito FAIL");
            });
        });        
    

console.log("finito");