console.log('RAML 1.0 JS Parser Test');
console.log(__dirname);
var path = require("path");
//var raml1Parser = require('../dist/index'); 
var raml1Parser = require('raml-1-parser');

//var dir = "../sa";
//var api = raml1Parser.loadApiSync(path.resolve(__dirname, "../apis/sa/applicationX.raml"));
//var api = raml1Parser.loadApiSync(path.resolve(__dirname, "../apis/sa/application.raml"));
//var api = raml1Parser.loadApiSync(path.resolve(dir, "../apis/sa/application.raml"));
var ramlRoot = path.resolve("apis/agent/clientAuthorisation/application.raml");
//var ramlRoot = path.resolve("../codegen/apis/sa/application.raml");
//var ramlRoot = path.resolve("apis/sa/application.raml");
console.log(ramlRoot);

/* schemas/schemas
var api = raml1Parser.loadRAMLSync(ramlRoot, [

], {

});
console.log("loaded raml");
*/

var api = raml1Parser.loadApiSync(ramlRoot, {

});
console.log("loaded api");

/*
var api = raml1Parser.loadSync(ramlRoot, {

});
console.log("loaded load");
*/

api.errors().forEach(function(x){
    console.log(JSON.stringify({
        code: x.code,
        message: x.message,
        path: x.path,
        start: x.start,
        end: x.end,
        isWarning: x.isWarning
    },null,2));
});

//console.log( "Some method name: " + api.resources()[0].methods()[0].method() );

console.log(JSON.stringify(api.toJSON(), null, 2));
