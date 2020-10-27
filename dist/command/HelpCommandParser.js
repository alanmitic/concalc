"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommandParser = void 0;
/**
 * Help command parser
 */
var HelpCommandParser = /** @class */ (function () {
    function HelpCommandParser(commandParserLut) {
        this.commandParserLut = commandParserLut;
    }
    HelpCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        console.log("Available Commands:");
        this.commandParserLut.forEach(function (value, key, map) {
            console.log(value.getUsage());
        });
    };
    HelpCommandParser.prototype.getUsage = function () {
        return "HELP";
    };
    HelpCommandParser.prototype.getDescription = function () {
        return "Gets help";
    };
    return HelpCommandParser;
}());
exports.HelpCommandParser = HelpCommandParser;
//# sourceMappingURL=HelpCommandParser.js.map