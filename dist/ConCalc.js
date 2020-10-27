"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConCalc = void 0;
var readline_1 = require("readline");
var CommandParser_1 = require("./CommandParser");
var ExprEval_1 = require("./ExprEval");
var ConCalc = /** @class */ (function () {
    function ConCalc() {
        var _this = this;
        this.ANSWER_VAR_NAME = "$ANS";
        this.vs = new Map();
        this.ee = new ExprEval_1.ExprEval(this.vs);
        this.cmdParser = new CommandParser_1.CommandParser(this);
        this.rl = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        this.rl.on('line', function (line) {
            var trimmedLine = line.trim();
            // Ignore empty lines.
            if (trimmedLine.length === 0) {
                return;
            }
            // A comment line
            if (trimmedLine.startsWith("#")) {
                return;
            }
            var isCommand = false;
            try {
                isCommand = _this.cmdParser.parse(trimmedLine);
            }
            catch (commandError) {
                console.error("[ERROR] " + commandError.message);
            }
            if (!isCommand) {
                // Assume anthing else is an expression, let the expression evalutor handle it.
                try {
                    var eeResult = _this.ee.evaluate(trimmedLine);
                    _this.vs.set(_this.ANSWER_VAR_NAME, eeResult);
                    console.log("[" + _this.ANSWER_VAR_NAME + "] " + eeResult);
                }
                catch (exprError) {
                    console.error("[ERROR] " + exprError.message);
                }
            }
        });
    }
    ConCalc.prototype.onCommandExit = function () {
        this.rl.close();
    };
    return ConCalc;
}());
exports.ConCalc = ConCalc;
//# sourceMappingURL=ConCalc.js.map