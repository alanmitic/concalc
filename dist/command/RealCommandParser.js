"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealCommandParser = void 0;
var LexAn_1 = require("../LexAn");
var CommandParser_1 = require("./CommandParser");
/**
 * REAL command parser
 */
var RealCommandParser = /** @class */ (function () {
    function RealCommandParser() {
    }
    /**
     * @override
     */
    RealCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] !== LexAn_1.TokenType.END) {
            throw new CommandParser_1.CommandError("syntax error in command");
        }
        commandImplementor.onCommandReal();
    };
    /**
     * @override
     */
    RealCommandParser.prototype.getUsage = function () {
        return "REAL";
    };
    /**
     * @override
     */
    RealCommandParser.prototype.getDescription = function () {
        return "Sets output mode to real (default mode of operation).";
    };
    return RealCommandParser;
}());
exports.RealCommandParser = RealCommandParser;
//# sourceMappingURL=RealCommandParser.js.map