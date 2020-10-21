"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LexAn_1 = require("./LexAn");
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
var lexAn = new LexAn_1.LexAn("   abcd");
var token = lexAn.getNextToken();
console.log(token);
//# sourceMappingURL=index.js.map