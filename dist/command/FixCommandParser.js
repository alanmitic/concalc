"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixCommandParser = void 0;
var LexAn_1 = require("../LexAn");
var CommandParser_1 = require("./CommandParser");
/**
 * Fix command parser
 */
var FixCommandParser = /** @class */ (function () {
    function FixCommandParser() {
    }
    FixCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        var precision = 2;
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] === LexAn_1.TokenType.NUMBER) {
            precision = nextToken[1];
        }
        else if (nextToken[0] !== LexAn_1.TokenType.END) {
            throw new CommandParser_1.CommandError("syntax error in command");
        }
        commandImplementor.onCommandFix(precision);
    };
    FixCommandParser.prototype.getUsage = function () {
        return "FIX [precision]";
    };
    FixCommandParser.prototype.getDescription = function () {
        return "Output variables defined in the variables store.";
    };
    return FixCommandParser;
}());
exports.FixCommandParser = FixCommandParser;
//# sourceMappingURL=FixCommandParser.js.map