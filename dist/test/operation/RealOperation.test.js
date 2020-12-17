"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var RealOperation_1 = require("../../operation/RealOperation");
describe("RealOperation API", function () {
    it("should implement assign operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.assign(1.23456789)).equal(1.23456789);
    });
    it("should implement unaryMinus operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.unaryMinus(1.23456789)).equal(-1.23456789);
    });
    it("should implement unaryPlus operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.unaryPlus(1.23456789)).equal(1.23456789);
    });
    it("should implement add operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.add(1.2, 3.4)).equal(4.6);
    });
    it("should implement subtract operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.subtract(1.75, 0.5)).equal(1.25);
    });
    it("should implement multiply operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.multiply(1.5, 0.5)).equal(0.75);
    });
    it("should implement divide operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.divide(3, 2)).equal(1.5);
    });
    it("should implement power operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.power(9, 0.5)).equal(3);
    });
    it("should implement modulo operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(op.modulo(9, 2)).equal(1);
    });
    it("should not support not operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.not(1); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support or operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.or(1, 2); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support and operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.and(1, 2); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support xor operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.xor(1, 2); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support left shift operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.leftShift(1, 2); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support right shift operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.rightShift(1, 2); }).to.throw("Operation not supported in real mode!");
    });
    it("should not support unsigned right shift operation", function () {
        var op = new RealOperation_1.RealOperation();
        chai_1.expect(function () { op.unsignedRightShift(1, 2); }).to.throw("Operation not supported in real mode!");
    });
});
//# sourceMappingURL=RealOperation.test.js.map