"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitCommandParser = void 0;
/**
 * Exit/Quit command parser
 */
var ExitCommandParser = /** @class */ (function () {
    function ExitCommandParser(isQuit) {
        this.isQuit = isQuit;
    }
    ExitCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        commandImplementor.onCommandExit();
    };
    ExitCommandParser.prototype.getUsage = function () {
        return this.isQuit ? "QUIT" : "EXIT";
    };
    ExitCommandParser.prototype.getDescription = function () {
        return "Exits concalc application.";
    };
    return ExitCommandParser;
}());
exports.ExitCommandParser = ExitCommandParser;
//# sourceMappingURL=ExitCommandParser.js.map