"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgOperation = void 0;
var ExprEval_1 = require("../ExprEval");
/**
 * Programmer Operation.
 */
var ProgOperation = /** @class */ (function () {
    /**
     * Constructs a programmers operation implementation.
     * @param bits Number of bits to use in calculations.
     */
    function ProgOperation(bits) {
        this.bits = bits;
    }
    ProgOperation.prototype.setBits = function (bits) {
        this.bits = bits;
    };
    /**
     * @override
     */
    ProgOperation.prototype.assign = function (value) {
        return this.truncate(value);
    };
    /**
     * @override
     */
    ProgOperation.prototype.unaryMinus = function (value) {
        return this.truncate(-value);
    };
    /**
     * @override
     */
    ProgOperation.prototype.unaryPlus = function (value) {
        return this.truncate(value);
    };
    /**
     * @override
     */
    ProgOperation.prototype.add = function (value1, value2) {
        return this.truncate(value1) + this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.subtract = function (value1, value2) {
        return this.truncate(value1) - this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.multiply = function (value1, value2) {
        return this.truncate(value1) * this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.divide = function (value1, value2) {
        if (this.truncate(value2) === 0.0) {
            throw new ExprEval_1.ExprError("divide by zero");
        }
        return this.truncate(value1) / this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.power = function (value1, value2) {
        return Math.pow(this.truncate(value1), this.truncate(value2));
    };
    /**
     * @override
     */
    ProgOperation.prototype.modulo = function (value1, value2) {
        if (this.truncate(value2) === 0.0) {
            throw new ExprEval_1.ExprError("divide by zero");
        }
        return this.truncate(value1) % this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.not = function (value1) {
        return ~this.truncate(value1);
    };
    /**
     * @override
     */
    ProgOperation.prototype.and = function (value1, value2) {
        return this.truncate(value1) & this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.or = function (value1, value2) {
        return this.truncate(value1) | this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.xor = function (value1, value2) {
        return this.truncate(value1) ^ this.truncate(value2);
    };
    /**
     * @override
     */
    ProgOperation.prototype.leftShift = function (value1, value2) {
        var shiftValue = this.truncate(value2);
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprEval_1.ExprError("out of range shift value");
        }
        return this.truncate(value1) << shiftValue;
    };
    /**
     * @override
     */
    ProgOperation.prototype.rightShift = function (value1, value2) {
        var shiftValue = this.truncate(value2);
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprEval_1.ExprError("out of range shift value");
        }
        return this.truncate(value1) >> shiftValue;
    };
    /**
     * @override
     */
    ProgOperation.prototype.unsignedRightShift = function (value1, value2) {
        var shiftValue = this.truncate(value2);
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprEval_1.ExprError("out of range shift value");
        }
        return this.truncate(value1) >>> shiftValue;
    };
    /**
     * Checks if the supplied bit size is supported.
     * @param bits Number of bits to check.
     * @returns true if supported, else false.
     */
    ProgOperation.isSupportedBitSize = function (bits) {
        return bits === 8 || bits === 16 || bits === 32;
    };
    /**
     * Truncates the supplied value to the current number of bits.
     * @param value Value to truncated.
     * @returns truncated value.
     */
    ProgOperation.prototype.truncate = function (value) {
        var intValue = Math.trunc(value);
        var bitMask = this.generateBitMask();
        var signBit = 1 << (this.bits - 1);
        intValue = intValue & bitMask;
        var isNegative = (signBit & intValue) !== 0;
        if (isNegative && intValue > 0) {
            intValue = -intValue;
        }
        return intValue;
    };
    /**
     * Generated a bit mask to mask off the bits based on the current bit size.
     * @returns bit mask.
     */
    ProgOperation.prototype.generateBitMask = function () {
        var mask = 0;
        for (var i = 0; i < this.bits; i++) {
            mask |= (1 << i);
        }
        return mask;
    };
    return ProgOperation;
}());
exports.ProgOperation = ProgOperation;
//# sourceMappingURL=ProgOperation.js.map