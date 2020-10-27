"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = void 0;
var LexAn_1 = require("../LexAn");
var ExitCommandParser_1 = require("./ExitCommandParser");
var HelpCommandParser_1 = require("./HelpCommandParser");
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor(commandImplementor) {
        this.commandParserLut = new Map();
        this.commandImplementor = commandImplementor;
        this.commandParserLut.set("EXIT", new ExitCommandParser_1.ExitCommandParser(false));
        this.commandParserLut.set("HELP", new HelpCommandParser_1.HelpCommandParser(this.commandParserLut));
        this.commandParserLut.set("QUIT", new ExitCommandParser_1.ExitCommandParser(true));
        // VARS -> Dumps variables in the variable store.
        // FIX ->
        // SCI ->
        // GEN ->
        // HEX ->
        // DEC ->
        // OCT ->
        // HELP ->
    }
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