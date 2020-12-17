"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgCommandParser = void 0;
var LexAn_1 = require("../LexAn");
var ProgOperation_1 = require("../operation/ProgOperation");
var CommandParser_1 = require("./CommandParser");
/**
 * PROG command parser
 */
var ProgCommandParser = /** @class */ (function () {
    function ProgCommandParser() {
    }
    /**
     * @override
     */
    ProgCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        var bits = 32;
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] === LexAn_1.TokenType.NUMBER) {
            bits = nextToken[1];
        }
        else if (nextToken[0] !== LexAn_1.TokenType.END) {
            throw new CommandParser_1.CommandError("syntax error in command");
        }
        if (!ProgOperation_1.ProgOperation.isSupportedBitSize(bits)) {
            throw new CommandParser_1.CommandError("invalid bit size");
        }
        commandImplementor.onCommandProg(bits);
    };
    /**
     * @override
     */
    ProgCommandParser.prototype.getUsage = function () {
        return "PROG [<bits=32>]";
    };
    /**
     * @override
     */
    ProgCommandParser.prototype.getDescription = function () {
        return "Sets output mode to programmer with the specified number of bits.";
    };
    return ProgCommandParser;
}());
exports.ProgCommandParser = ProgCommandParser;
//# sourceMappingURL=ProgCommandParser.js.map