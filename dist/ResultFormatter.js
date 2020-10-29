"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultFormatter = exports.ResultBase = exports.ResultMode = void 0;
/**
 * Result display mode.
 */
var ResultMode;
(function (ResultMode) {
    /** General automatic mode. */
    ResultMode[ResultMode["GENERAL"] = 0] = "GENERAL";
    /** Fixed point mode. */
    ResultMode[ResultMode["FIXED"] = 1] = "FIXED";
    /** Scientific mode. */
    ResultMode[ResultMode["SCIENTIFIC"] = 2] = "SCIENTIFIC";
})(ResultMode = exports.ResultMode || (exports.ResultMode = {}));
/**
 * Result base.
 */
var ResultBase;
(function (ResultBase) {
    /** Octal base. */
    ResultBase[ResultBase["OCT"] = 0] = "OCT";
    /** Decimal base. */
    ResultBase[ResultBase["DEC"] = 1] = "DEC";
    /**Hexadecimal base. */
    ResultBase[ResultBase["HEX"] = 2] = "HEX";
})(ResultBase = exports.ResultBase || (exports.ResultBase = {}));
var ResultFormatter = /** @class */ (function () {
    function ResultFormatter() {
        this.mode = ResultMode.GENERAL;
        this.base = ResultBase.DEC;
        this.fixedPrecision = 2;
    }
    ResultFormatter.prototype.format = function (value) {
        return value.toString();
    };
    return ResultFormatter;
}());
exports.ResultFormatter = ResultFormatter;
//# sourceMappingURL=ResultFormatter.js.map