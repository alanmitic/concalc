"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
var LexAn_1 = require("../LexAn");
var ExitCommandParser_1 = require("./ExitCommandParser");
var HelpCommandParser_1 = require("./HelpCommandParser");
var VarsCommandParser_1 = require("./VarsCommandParser");
var FixCommandParser_1 = require("./FixCommandParser");
var SciCommandParser_1 = require("./SciCommandParser");
var RealCommandParser_1 = require("./RealCommandParser");
var ProgCommandParser_1 = require("./ProgCommandParser");
/**
 * Command executor.  Parses the command using the lexical analyser then executed the appropriate implementation method.
 */
var CommandExecutor = /** @class */ (function () {
    /**
     * Constructs a command executor and uses the supplied command implementor to execute the commands.
     * @param commandImplementor Command implementor.
     */
    function CommandExecutor(commandImplementor) {
        /** Command parser lookup table.  */
        this.commandParserLut = new Map();
        this.commandImplementor = commandImplementor;
        // Build the lookup table of command parsers.
        this.commandParserLut.set("EXIT", new ExitCommandParser_1.ExitCommandParser(false));
        this.commandParserLut.set("HELP", new HelpCommandParser_1.HelpCommandParser(this.commandParserLut));
        this.commandParserLut.set("QUIT", new ExitCommandParser_1.ExitCommandParser(true));
        this.commandParserLut.set("VARS", new VarsCommandParser_1.VarsCommandParser());
        this.commandParserLut.set("FIX", new FixCommandParser_1.FixCommandParser());
        this.commandParserLut.set("SCI", new SciCommandParser_1.SciCommandParser());
        this.commandParserLut.set("REAL", new RealCommandParser_1.RealCommandParser());
        this.commandParserLut.set("PROG", new ProgCommandParser_1.ProgCommandParser());
    }
    /**
     * Checks if the command string contains a command, if it does attempts to parse and execute it.  if no command
     * found it returns false.
     * @param commandString command string to parse.
     * @returns true if command found, else false.
     * @throws {CommandError} Command error.
     */
    CommandExecutor.prototype.parse = function (commandString) {
        var isCommand = false;
        var lexAn = new LexAn_1.LexAn(commandString);
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] === LexAn_1.TokenType.IDENTIFIER) {
            var commandName = nextToken[1].toUpperCase();
            var specificCommandParser = this.commandParserLut.get(commandName);
            if (specificCommandParser !== undefined) {
                isCommand = true;
                specificCommandParser.parse(lexAn, this.commandImplementor);
            }
        }
        return isCommand;
    };
    return CommandExecutor;
}());
exports.CommandExecutor = CommandExecutor;
//# sourceMappingURL=CommandExecutor.js.map