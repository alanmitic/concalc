import { expect } from "chai"
import { ExprEval, VariableStore } from "./ExprEval"

describe("Expression Evaluator API", function () {
    it("should evaluate numbers in an expression", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("0")).equal(0)
        expect(ee.evaluate("1000")).equal(1000)
    })

    it("should evaluate expressions with the unary minus operator", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("-1234")).equal(-1234)
    })

    it("should evaluate expressions with the unary plus operator", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("+1234")).equal(1234)
    })

    it("should evaluate expressions with the bitwise not (complement) operator", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("~255")).equal(-256)
    })

    it("should evaluate expressions with the power operator", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("2^16")).equal(65536)
    })

    it("should evaluate expressions with the parenthesis", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("((1234))")).equal(1234)
    })

    it("should evaluate expressions with the variables", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("$myVar")).equal(0)
    })

    it("should evaluate expressions with the variable assignments", function () {
        let vs: VariableStore = new Map();
        let ee = new ExprEval(vs);

        expect(ee.evaluate("$myVar=1234")).equal(1234)
    })

})
