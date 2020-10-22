"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ExprEval_1 = require("./ExprEval");
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
        chai_1.expect(ee.evaluate("~255")).equal(-256);
    });
    it("should evaluate expressions with the power operator", function () {
        var vs = new Map();
        var ee = new ExprEval_1.ExprEval(vs);
        chai_1.expect(ee.evaluate("2^16")).equal(65536);
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
});
//# sourceMappingURL=ExprEval.test.js.map