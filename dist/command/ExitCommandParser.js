"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExitCommandParser = void 0;
/**
 * EXIT/QUIT command parser
 */
var ExitCommandParser = /** @class */ (function () {
    /**
     * Constructs an EXIT (or QUIT) command parser.
     * @param isQuit true if quit command else false.
     */
    function ExitCommandParser(isQuit) {
        this.isQuit = isQuit;
    }
    /**
     * @override
     */
    ExitCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        commandImplementor.onCommandExit();
    };
    /**
     * @override
     */
    ExitCommandParser.prototype.getUsage = function () {
        return this.isQuit ? "QUIT" : "EXIT";
    };
    /**
     * @override
     */
    ExitCommandParser.prototype.getDescription = function () {
        return "Exits concalc application.";
    };
    return ExitCommandParser;
}());
exports.ExitCommandParser = ExitCommandParser;
//# sourceMappingURL=ExitCommandParser.js.map