"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExprEval_1 = require("./ExprEval");
//import { ReadLine } from "readline"
var readline = require('readline');
console.log("Console Calculator");
var vs = new Map();
var ee = new ExprEval_1.ExprEval(vs);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
rl.on('line', function (line) {
    var eeResult = ee.evaluate(line);
    console.log(eeResult);
});
//# sourceMappingURL=index.js.map