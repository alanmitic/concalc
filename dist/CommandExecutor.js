"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandExecutor = exports.CommandException = void 0;
var LexAn_1 = require("./LexAn");
var CommandException = /** @class */ (function () {
    function CommandException(message) {
    }
    return CommandException;
}());
exports.CommandException = CommandException;
var CommandExecutor = /** @class */ (function () {
    function CommandExecutor(commandImplementor) {
        this.commandImplementor = commandImplementor;
    }
    CommandExecutor.prototype.execute = function (commandString) {
        var lexAn = new LexAn_1.LexAn(commandString);
        var nextToken = lexAn.getNextToken();
        if (nextToken[0] !== LexAn_1.TokenType.COMMAND) {
            throw new CommandException("expected command type");
        }
        switch (nextToken[1]) {
            case "@quit":
            case "@exit":
                this.commandImplementor.onCommandExit();
                break;
            default:
                throw new CommandException("unknown command " + nextToken[1]);
        }
    };
    return CommandExecutor;
}());
exports.CommandExecutor = CommandExecutor;
//# sourceMappingURL=CommandExecutor.js.map