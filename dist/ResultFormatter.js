"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultFormatter = exports.ResultMode = void 0;
/**
 * Result display mode.
 */
var ResultMode;
(function (ResultMode) {
    /** Automatic mode. */
    ResultMode[ResultMode["AUTO"] = 0] = "AUTO";
    /** Fixed point mode. */
    ResultMode[ResultMode["FIXED"] = 1] = "FIXED";
    /** Scientific mode. */
    ResultMode[ResultMode["SCIENTIFIC"] = 2] = "SCIENTIFIC";
    /** Programmer mode. */
    ResultMode[ResultMode["PROGRAMMER"] = 3] = "PROGRAMMER";
})(ResultMode = exports.ResultMode || (exports.ResultMode = {}));
/**
 * Result formatter.
 */
var ResultFormatter = /** @class */ (function () {
    /**
     * Constructor.
     */
    function ResultFormatter() {
        /** Result formatter mode. */
        this.mode = ResultMode.AUTO;
        /** Result formatter precision. */
        this.precision = 2;
    }
    /**
     * Gets the result formatter mode.
     * @returns Mode.
     */
    ResultFormatter.prototype.getMode = function () {
        return this.mode;
    };
    /**
     * Sets the result formatter mode.
     * @param mode Formatter mode.
     */
    ResultFormatter.prototype.setMode = function (mode) {
        this.mode = mode;
    };
    /**
     * Gets the result formatter precision
     * @returns Formatter precision
     */
    ResultFormatter.prototype.getPrecision = function () {
        return this.precision;
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
            case ResultMode.AUTO:
                formattedValue = value.toString();
                break;
            case ResultMode.PROGRAMMER:
                formattedValue = this.formatProgrammerResult(value);
                break;
        }
        return formattedValue;
    };
    ResultFormatter.prototype.formatProgrammerResult = function (value) {
        var binValue = value.toString(2);
        var octValue = value.toString(8);
        var decValue = value.toString(10);
        var hexValue = value.toString(16);
        return binValue +
            " bin, " + octValue + " oct, " + decValue + " dec, " + hexValue + " hex";
    };
    return ResultFormatter;
}());
exports.ResultFormatter = ResultFormatter;
//# sourceMappingURL=ResultFormatter.js.map