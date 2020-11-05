"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConCalc = void 0;
var readline_1 = require("readline");
var CommandExecutor_1 = require("./command/CommandExecutor");
var ExprEval_1 = require("./ExprEval");
var ResultFormatter_1 = require("./ResultFormatter");
var ConCalc = /** @class */ (function () {
    function ConCalc() {
        var _this = this;
        this.ANSWER_VAR_NAME = "$ANS";
        this.PROMPT = "CONCALC :> ";
        this.rf = new ResultFormatter_1.ResultFormatter();
        this.vs = new Map();
        this.vs.set(this.ANSWER_VAR_NAME, 0);
        this.ee = new ExprEval_1.ExprEval(this.vs);
        this.cmdParser = new CommandExecutor_1.CommandExecutor(this);
        this.rl = readline_1.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });
        this.displayPrompt();
        this.rl.on('line', function (line) {
            var trimmedLine = line.trim();
            // Ignore empty lines and comment lines.
            if (trimmedLine.length === 0 || trimmedLine.startsWith("#")) {
                _this.displayPrompt();
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
                // Assume anything else is an expression, let the expression evaluator handle it.
                try {
                    var eeResult = _this.ee.evaluate(trimmedLine);
                    _this.vs.set(_this.ANSWER_VAR_NAME, eeResult);
                    console.log("[RESULT] " + _this.rf.format(eeResult));
                }
                catch (exprError) {
                    console.error("[ERROR] " + exprError.message);
                }
            }
            _this.displayPrompt();
        }).on('close', function () {
            process.exit(0);
        });
    }
    ConCalc.prototype.displayPrompt = function () {
        this.rl.setPrompt(this.PROMPT);
        this.rl.prompt(true);
    };
    ConCalc.prototype.onCommandVars = function () {
        console.log("Variables store contains:");
        this.vs.forEach(function (value, key, map) {
            console.log(" - " + key + " : " + value);
        });
    };
    ConCalc.prototype.onCommandExit = function () {
        this.rl.close();
    };
    ConCalc.prototype.onCommandFix = function (precision) {
        this.rf.setMode(ResultFormatter_1.ResultMode.FIXED);
        this.rf.setPrecision(precision);
    };
    return ConCalc;
}());
exports.ConCalc = ConCalc;
//# sourceMappingURL=ConCalc.js.map