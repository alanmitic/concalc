"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealOperation = void 0;
var ExprEval_1 = require("../ExprEval");
/**
 * Real Operation.
 */
var RealOperation = /** @class */ (function () {
    function RealOperation() {
    }
    RealOperation.prototype.assign = function (value) {
        return value;
    };
    RealOperation.prototype.unaryMinus = function (value) {
        return -value;
    };
    RealOperation.prototype.unaryPlus = function (value) {
        return value;
    };
    RealOperation.prototype.add = function (value1, value2) {
        return value1 + value2;
    };
    RealOperation.prototype.subtract = function (value1, value2) {
        return value1 - value2;
    };
    RealOperation.prototype.multiply = function (value1, value2) {
        return value1 * value2;
    };
    RealOperation.prototype.divide = function (value1, value2) {
        if (value2 === 0.0) {
            throw new ExprEval_1.ExprError("divide by zero");
        }
        return value1 / value2;
    };
    RealOperation.prototype.power = function (value1, value2) {
        return Math.pow(value1, value2);
    };
    RealOperation.prototype.modulo = function (value1, value2) {
        if (value2 === 0.0) {
            throw new ExprEval_1.ExprError("divide by zero");
        }
        return value1 % value2;
    };
    RealOperation.prototype.not = function (value1) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.and = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.or = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.xor = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.leftShift = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.rightShift = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    RealOperation.prototype.unsignedRightShift = function (value1, value2) {
        throw new ExprEval_1.ExprError("Operation not supported in real mode!");
    };
    return RealOperation;
}());
exports.RealOperation = RealOperation;
//# sourceMappingURL=RealOperation.js.map