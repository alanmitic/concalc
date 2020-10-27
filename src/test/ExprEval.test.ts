import { expect } from "chai"
import { ExprEval, VariableStore } from "../ExprEval"

describe("Expression Evaluator API", () => {
    it("should evaluate numbers in an expression", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("0")).equal(0)
        expect(ee.evaluate("1000")).equal(1000)
    })

    it("should evaluate expressions with the unary minus operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("-1234")).equal(-1234)
    })

    it("should evaluate expressions with the unary plus operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("+1234")).equal(1234)
    })

    it("should evaluate expressions with the bitwise not (complement) operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("~255")).equal(-256)
    })

    it("should evaluate expressions with the bitwise xor operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("255'170")).equal(85)
    })

    it("should evaluate expressions with the bitwise or operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("85|170")).equal(255)
    })

    it("should evaluate expressions with the bitwise and operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("85&170")).equal(0)
    })

    it("should evaluate expressions with the power operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("2^16")).equal(65536)
    })

    it("should evaluate expressions with the plus operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("100+99")).equal(199)
    })

    it("should evaluate expressions with the minus operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("77-33")).equal(44)
    })

    it("should evaluate expressions with the multiply operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("3*4")).equal(12)
    })

    it("should evaluate expressions with the divide operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("12/4")).equal(3)
    })

    it("should evaluate expressions with the mod operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("12%5")).equal(2)
    })

    it("should evaluate expressions with the left shift operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("1<<8")).equal(256)
    })

    it("should evaluate expressions with the right shift operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("8>>2")).equal(2)
    })

    it("should evaluate expressions with the unsigned right shift operator", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("-1>>5")).equal(-1)
    })

    it("should evaluate expressions with the parenthesis", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("((1234))")).equal(1234)
    })

    it("should evaluate expressions with the variables", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("$myVar")).equal(0)
    })

    it("should evaluate expressions with the variable assignments", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)

        expect(ee.evaluate("$myVar=1234")).equal(1234)
    })

    it("should detect missing primary in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("")}).to.throw("primary expected")
    })

    it("should detect syntax errors in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("4@")}).to.throw("syntax error in expression")
    })

    it("should detect out of range left shift values in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("1<<32")}).to.throw("out of range shift value")
        expect(() => {ee.evaluate("1<<-1")}).to.throw("out of range shift value")
    })

    it("should detect out of range right shift values in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("1>>32")}).to.throw("out of range shift value")
        expect(() => {ee.evaluate("1>>-1")}).to.throw("out of range shift value")
        expect(() => {ee.evaluate("1>>>32")}).to.throw("out of range shift value")
        expect(() => {ee.evaluate("1>>>-1")}).to.throw("out of range shift value")
    })

    it("should detect divide by zero conditions in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("1/0")}).to.throw("divide by zero")
        expect(() => {ee.evaluate("1%0")}).to.throw("divide by zero")
    })

    it("should missing closing parenthesis in expressions and throw an error", () => {
        let vs: VariableStore = new Map()
        let ee = new ExprEval(vs)
        expect(() => {ee.evaluate("3 * (2/8")}).to.throw(") expected")
    })

})
