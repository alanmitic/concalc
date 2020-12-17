"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ProgOperation_1 = require("../../operation/ProgOperation");
describe("ProgOperation API", function () {
    it("should implement assign operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.assign(1.23456789)).equal(1);
    });
    it("should implement unaryMinus operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.unaryMinus(1.23456789)).equal(-1);
    });
    it("should implement unaryPlus operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.unaryPlus(1.23456789)).equal(1);
    });
    it("should implement add operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.add(1.2, 3.4)).equal(4);
    });
    it("should implement subtract operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.subtract(1.75, 0.5)).equal(1);
    });
    it("should implement multiply operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.multiply(3.5, 2.5)).equal(6);
    });
    it("should implement divide operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.divide(3, 2)).equal(1.5);
    });
    it("should implement power operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.power(2, 8)).equal(256);
    });
    it("should implement modulo operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        chai_1.expect(op.modulo(9, 2)).equal(1);
    });
    it("should implement not operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭~1010 1010 1010 1010 1010 1010 1010 1010‬
        // = ‭0101 0101 0101 0101 0101 0101 0101 0101‬
        chai_1.expect(op.not(-1431655766)).equal(1431655765);
    });
    it("should implement or operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
        // & 0000 1111 1111 0000 0101 0101 0101 0101
        // = 1111 1111 1111 0000 1111 1111 1111 1111
        chai_1.expect(op.or(-252663126, 267408725)).equal(-983041);
    });
    it("should implement and operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
        // & 0000 1111 1111 0000 0101 0101 0101 0101
        // = 0000 0000 1111 0000 0000 0000 0000 0000
        chai_1.expect(op.and(-252663126, 267408725)).equal(15728640);
    });
    it("should implement xor operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭ 1111 0000 1111 0000 1010 1010 1010 1010
        // ' 0000 1111 1111 0000 0101 0101 0101 0101
        // = 1111 1111 0000 0000 1111 1111 1111 1111
        chai_1.expect(op.xor(-252663126, 267408725)).equal(-16711681);
    });
    it("should implement left shift operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭  1111 0000 1111 0000 1010 1010 1010 1010
        // << 1
        // =  1110 0001 1110 0001 0101 0101 0101 0100
        chai_1.expect(op.leftShift(-252663126, 1)).equal(-505326252);
    });
    it("should implement right shift operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭  1111 0000 1111 0000 1010 1010 1010 1010
        // >> 1
        // =  1111 1000 0111 1000 0101 0101 0101 0101
        chai_1.expect(op.rightShift(-252663126, 1)).equal(-126331563);
    });
    it("should implement unsigned right shift operation", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        //  ‭   1111 0000 1111 0000 1010 1010 1010 1010
        // >>> 1
        // =   0111 1000 0111 1000 0101 0101 0101 0101
        chai_1.expect(op.unsignedRightShift(-252663126, 1)).equal(2021152085);
    });
    it("should validate supported bit size with isSupportedBitSize", function () {
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(8)).equal(true);
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(16)).equal(true);
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(32)).equal(true);
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(0)).equal(false);
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(7)).equal(false);
        chai_1.expect(ProgOperation_1.ProgOperation.isSupportedBitSize(-8)).equal(false);
    });
    it("should truncate values to the current bit size when in 8-bit mode", function () {
        var op = new ProgOperation_1.ProgOperation(8);
        // Min value
        // 1111 1111 1111 1111 1111 1111 1000 0000 -> 1000 0000
        chai_1.expect(op.assign(-128)).equal(-128);
        // Zero value
        // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000
        chai_1.expect(op.assign(0)).equal(0);
        // Max value
        // 0000 0000 0000 0000 0000 0000 0111 1111 -> 0111 1111
        chai_1.expect(op.assign(127)).equal(127);
        // +ve overflow value
        // 0000 0000 0000 0000 0000 0000 1000 0000 -> 1000 1000
        chai_1.expect(op.assign(128)).equal(-128);
        // -ve overflow value
        // ‭1111 1111 1111 1111 1111 1111 0111 1111‬ -> 0111 1111
        chai_1.expect(op.assign(-129)).equal(127);
    });
    it("should truncate values to the current bit size when in 16-bit mode", function () {
        var op = new ProgOperation_1.ProgOperation(16);
        // Min value
        // 1111 1111 1111 1111 1000 0000 0000 0000 -> 1000 0000 0000 0000
        chai_1.expect(op.assign(-32768)).equal(-32768);
        // Zero value
        // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000 0000 0000
        chai_1.expect(op.assign(0)).equal(0);
        // Max value
        // 0000 0000 0000 0000 0111 1111 1111 1111 -> 0111 1111 1111 1111
        chai_1.expect(op.assign(32767)).equal(32767);
        // +ve overflow value
        // 0000 0000 0000 0000 1000 0000 0000 0000 -> 1000 0000 0000 0000
        chai_1.expect(op.assign(32768)).equal(-32768);
        // -ve overflow value
        // ‭1111 1111 1111 1111 0111 1111 1111 1111‬ -> 0111 1111 1111 1111
        chai_1.expect(op.assign(-32769)).equal(32767);
    });
    it("should truncate values to the current bit size when in 32-bit mode", function () {
        var op = new ProgOperation_1.ProgOperation(32);
        // Min value
        // 1000 0000 0000 0000 0000 0000 0000 0000 -> 1000 0000 0000 0000 0000 0000 0000 0000
        chai_1.expect(op.assign(-2147483648)).equal(-2147483648);
        // Zero value
        // 0000 0000 0000 0000 0000 0000 0000 0000 -> 0000 0000 0000 0000 0000 0000 0000 0000
        chai_1.expect(op.assign(0)).equal(0);
        // Max value
        // 0111 1111 1111 1111 1111 1111 1111 1111 -> 0111 1111 1111 1111 1111 1111 1111 1111
        chai_1.expect(op.assign(2147483647)).equal(2147483647);
        // +ve overflow value
        // 1000 0000 0000 0000 0000 0000 0000 0000 -> 1000 0000 0000 0000 0000 0000 0000 0000
        chai_1.expect(op.assign(2147483648)).equal(-2147483648);
        // -ve overflow value
        // ‭0111 1111 1111 1111 1111 1111 1111 1111‬ -> 0111 1111 1111 1111 1111 1111 1111 1111
        chai_1.expect(op.assign(-2147483649)).equal(2147483647);
    });
});
//# sourceMappingURL=ProgOperation.test.js.map