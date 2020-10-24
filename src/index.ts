import { ExprEval, VariableStore } from "./ExprEval"
//import { ReadLine } from "readline"

var readline = require('readline');

console.log("Console Calculator");

let vs: VariableStore = new Map();
let ee = new ExprEval(vs);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line:string){
    let eeResult = ee.evaluate(line)
    console.log(eeResult);
})
