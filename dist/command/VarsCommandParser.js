"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VarsCommandParser = void 0;
/**
 * Vars command parser
 */
var VarsCommandParser = /** @class */ (function () {
    function VarsCommandParser() {
    }
    VarsCommandParser.prototype.parse = function (lexAn, commandImplementor) {
        commandImplementor.onCommandVars();
    };
    VarsCommandParser.prototype.getUsage = function () {
        return "VARS";
    };
    VarsCommandParser.prototype.getDescription = function () {
        return "Output variables defined in the variables store.";
    };
    return VarsCommandParser;
}());
exports.VarsCommandParser = VarsCommandParser;
//# sourceMappingURL=VarsCommandParser.js.map