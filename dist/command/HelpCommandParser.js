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
        console.log("\nThe following commands are available:");
        this.commandParserLut.forEach(function (value, key, map) {
            console.log(" - " + value.getUsage() + " : " + value.getDescription());
        });
    };
    HelpCommandParser.prototype.getUsage = function () {
        return "HELP";
    };
    HelpCommandParser.prototype.getDescription = function () {
        return "Displays help.";
    };
    return HelpCommandParser;
}());
exports.HelpCommandParser = HelpCommandParser;
//# sourceMappingURL=HelpCommandParser.js.map