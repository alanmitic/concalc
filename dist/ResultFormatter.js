"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultFormatter = exports.ResultBase = exports.ResultMode = void 0;
var ResultMode;
(function (ResultMode) {
    ResultMode[ResultMode["GENERAL"] = 0] = "GENERAL";
    ResultMode[ResultMode["FIXED"] = 1] = "FIXED";
    ResultMode[ResultMode["SCIENTIFIC"] = 2] = "SCIENTIFIC";
})(ResultMode = exports.ResultMode || (exports.ResultMode = {}));
var ResultBase;
(function (ResultBase) {
    ResultBase[ResultBase["OCT"] = 0] = "OCT";
    ResultBase[ResultBase["DEC"] = 1] = "DEC";
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