"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommandParser = void 0;
/**
 * HELP command parser
 */
var HelpCommandParser = /** @class */ (function () {
    /**
     * Constructs a HELP command parser, with the command held in the command parser lookup table.
     * @param commandParserLut Command parser lookup table.
     */
    function HelpCommandParser(commandParserLut) {
        this.commandParserLut = commandParserLut;
    }
    /**
     * @override
     */
    HelpCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        console.log("\nThe following commands are available:");
        this.commandParserLut.forEach(function (value, key, map) {
            console.log(" - " + value.getUsage() + " : " + value.getDescription());
        });
    };
    /**
     * @override
     */
    HelpCommandParser.prototype.getUsage = function () {
        return "HELP";
    };
    /**
     * @override
     */
    HelpCommandParser.prototype.getDescription = function () {
        return "Displays help.";
    };
    return HelpCommandParser;
}());
exports.HelpCommandParser = HelpCommandParser;
//# sourceMappingURL=HelpCommandParser.js.map