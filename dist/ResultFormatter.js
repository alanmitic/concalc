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
/**
 * Result formatter.
 */
var ResultFormatter = /** @class */ (function () {
    /**
     * Constructor.
     */
    function ResultFormatter() {
        /** Result formatter mode. */
        this.mode = ResultMode.GENERAL;
        /** Result formatter base. */
        this.base = ResultBase.DEC;
        /** Result formatter precision. */
        this.precision = 2;
    }
    /**
     * Sets the result formatter mode.
     * @param mode Formatter mode.
     */
    ResultFormatter.prototype.setMode = function (mode) {
        this.mode = mode;
    };
    /**
     * Sets the result formatter precision.
     * @param precision Precision.
     */
    ResultFormatter.prototype.setPrecision = function (precision) {
        this.precision = precision;
    };
    /**
     * Formats the number into a string.
     * @param value Number to format.
     */
    ResultFormatter.prototype.format = function (value) {
        var formattedValue;
        switch (this.mode) {
            case ResultMode.FIXED:
                formattedValue = value.toFixed(this.precision);
                break;
            case ResultMode.SCIENTIFIC:
                formattedValue = value.toExponential(this.precision);
                break;
            case ResultMode.GENERAL:
                formattedValue = value.toString();
                break;
        }
        return formattedValue;
    };
    return ResultFormatter;
}());
exports.ResultFormatter = ResultFormatter;
//# sourceMappingURL=ResultFormatter.js.map