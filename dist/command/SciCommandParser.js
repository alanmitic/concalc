"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SciCommandParser = void 0;
var LexAn_1 = require("../LexAn");
var CommandParser_1 = require("./CommandParser");
/**
 * SCI command parser
 */
var SciCommandParser = /** @class */ (function () {
    function SciCommandParser() {
    }
    /**
     * @override
     */
    SciCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        var precision = 2;
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] === LexAn_1.TokenType.NUMBER) {
            precision = nextToken[1];
        }
        else if (nextToken[0] !== LexAn_1.TokenType.END) {
            throw new CommandParser_1.CommandError("syntax error in command");
        }
        commandImplementor.onCommandSci(precision);
    };
    /**
     * @override
     */
    SciCommandParser.prototype.getUsage = function () {
        return "SCI [<precision=2>]";
    };
    /**
     * @override
     */
    SciCommandParser.prototype.getDescription = function () {
        return "Sets output mode to scientific with the optionally specified precision.";
    };
    return SciCommandParser;
}());
exports.SciCommandParser = SciCommandParser;
//# sourceMappingURL=SciCommandParser.js.map