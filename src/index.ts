import { ReadLine, createInterface } from "readline";
import { ExprEval, VariableStore } from "./ExprEval"

console.log("Console Calculator");

let vs: VariableStore = new Map();
let ee = new ExprEval(vs);

var rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function(line:string){
    let eeResult = ee.evaluate(line)
    console.log(eeResult);
}).on("end", () => {
    console.log("Done.");
    process.exit();
});
