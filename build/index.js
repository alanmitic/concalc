"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
var ExprEval_1 = require("./ExprEval");
console.log("Console Calculator");
var vs = new Map();
var ee = new ExprEval_1.ExprEval(vs);
var rl = readline_1.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', function (line) {
    var eeResult = ee.evaluate(line);
    console.log(eeResult);
}).on("end", function () {
    console.log("Done.");
    process.exit();
});
//# sourceMappingURL=index.js.map