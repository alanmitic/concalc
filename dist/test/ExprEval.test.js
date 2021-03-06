"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ExprEval_1 = require("../ExprEval");
describe("Expression Evaluator API", function () {
    it("should evaluate numbers in an expression", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("0")).equal(0);
        chai_1.expect(ee.evaluate("1000")).equal(1000);
    });
    it("should evaluate expressions with the unary minus operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("-1234")).equal(-1234);
    });
    it("should evaluate expressions with the unary plus operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("+1234")).equal(1234);
    });
    it("should evaluate expressions with the bitwise not (complement) operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("~255"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("~255")).equal(-256);
    });
    it("should evaluate expressions with the bitwise xor operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("255'170"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("255'170")).equal(85);
    });
    it("should evaluate expressions with the bitwise or operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("85|170"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("85|170")).equal(255);
    });
    it("should evaluate expressions with the bitwise and operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("85&170"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("85&170")).equal(0);
    });
    it("should evaluate expressions with the power operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("2^16")).equal(65536);
    });
    it("should evaluate expressions with the plus operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("100+99")).equal(199);
    });
    it("should evaluate expressions with the minus operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("77-33")).equal(44);
    });
    it("should evaluate expressions with the multiply operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("3*4")).equal(12);
    });
    it("should evaluate expressions with the divide operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("12/4")).equal(3);
    });
    it("should evaluate expressions with the mod operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("12%5")).equal(2);
    });
    it("should evaluate expressions with the left shift operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("1<<8"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("1<<8")).equal(256);
    });
    it("should evaluate expressions with the right shift operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("8>>2"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("8>>2")).equal(2);
    });
    it("should evaluate expressions with the unsigned right shift operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("-1>>5"); }).to.throw("Operation not supported in real mode!");
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(ee.evaluate("-1>>5")).equal(-1);
    });
    it("should evaluate expressions with the parenthesis", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("((1234))")).equal(1234);
    });
    it("should evaluate expressions with the variables", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("$myVar")).equal(0);
    });
    it("should evaluate expressions with the variable assignments", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("$myVar=1234")).equal(1234);
    });
    it("should detect missing primary in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate(""); }).to.throw("primary expected");
    });
    it("should detect syntax errors in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("4$"); }).to.throw("syntax error in expression");
    });
    it("should detect out of range left shift values in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(function () { ee.evaluate("1<<32"); }).to.throw("out of range shift value");
        chai_1.expect(function () { ee.evaluate("1<<-1"); }).to.throw("out of range shift value");
    });
    it("should detect out of range right shift values in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        ee.setOperatingMode(ExprEval_1.OperatingMode.PROGRAMMER);
        chai_1.expect(function () { ee.evaluate("1>>32"); }).to.throw("out of range shift value");
        chai_1.expect(function () { ee.evaluate("1>>-1"); }).to.throw("out of range shift value");
        chai_1.expect(function () { ee.evaluate("1>>>32"); }).to.throw("out of range shift value");
        chai_1.expect(function () { ee.evaluate("1>>>-1"); }).to.throw("out of range shift value");
    });
    it("should detect divide by zero conditions in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("1/0"); }).to.throw("divide by zero");
        chai_1.expect(function () { ee.evaluate("1%0"); }).to.throw("divide by zero");
    });
    it("should missing closing parenthesis in expressions and throw an error", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(function () { ee.evaluate("3 * (2/8"); }).to.throw(") expected");
    });
});
//# sourceMappingURL=ExprEval.test.js.map