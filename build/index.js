"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExprEval_1 = require("./ExprEval");
/*import * as readline from "readline";

console.log("Console Calculator");


let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let isExitCommand: boolean = false;

const start = async () => {
    for await (const line of rl) {
        console.log(line)
    }
};

start()
rl.close();
*/
/*//while(!isExitCommand) {
    rl.question("concalc >> ", (answer) => {
        switch(answer.toLowerCase()) {
        case 'exit':
            isExitCommand = true;
            break;
        default:
            rl.write("Evaluating: " + answer);
            break;
        }

        rl.close();
    });
//}*/
console.log("Console Calculator");
var vs = new Map();
var ee = new ExprEval_1.ExprEval(vs);
console.log(ee.evaluate("85|170"));
//# sourceMappingURL=index.js.map