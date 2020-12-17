"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExprEval = exports.OperatingMode = exports.ExprError = void 0;
var LexAn_1 = require("./LexAn");
var ProgOperation_1 = require("./operation/ProgOperation");
var RealOperation_1 = require("./operation/RealOperation");
var ExprError = /** @class */ (function (_super) {
    __extends(ExprError, _super);
    function ExprError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ExprError";
        return _this;
    }
    return ExprError;
}(Error));
exports.ExprError = ExprError;
/**
 * Operating mode.
 */
var OperatingMode;
(function (OperatingMode) {
    /** Real mode (Default). */
    OperatingMode[OperatingMode["REAL"] = 0] = "REAL";
    /** Programmers mode. */
    OperatingMode[OperatingMode["PROGRAMMER"] = 1] = "PROGRAMMER";
})(OperatingMode = exports.OperatingMode || (exports.OperatingMode = {}));
/**
 * Expression Evaluator.
 */
var ExprEval = /** @class */ (function () {
    function ExprEval(variableStore) {
        /** Operating mode. */
        this.operatingMode = OperatingMode.REAL;
        this.variableStore = variableStore;
        this.operationImpls = [new RealOperation_1.RealOperation(), new ProgOperation_1.ProgOperation(32)];
    }
    /**
     * Gets the operating mode.
     * @return Operating mode.
     */
    ExprEval.prototype.getOperatingMode = function () {
        return this.operatingMode;
    };
    /**
     * Sets the operating mode.
     * @param operatingMode New operating mode.
     */
    ExprEval.prototype.setOperatingMode = function (operatingMode) {
        this.operatingMode = operatingMode;
    };
    ExprEval.prototype.evaluate = function (expression) {
        try {
            var lexAn = new LexAn_1.LexAn(expression);
            return this.getTermPrecedence0(lexAn, this.operationImpls[this.operatingMode]);
        }
        catch (lexAnError) {
            throw new ExprError(lexAnError.message);
        }
    };
    /**
     * 	This method evaluates term(s) in an expression, taking into account
     * operator precedence.
     *
     * Operator Name         | Operator      | Associative
     * ------------------------------------------------------ HIGH
     * unary minus           | - expr        | (right-associative)
     * unary plus            | + expr        | (right-associative)
     * not (complement)      | ~ expr        | (right-associative)
     * -----------------------------------------------------------
     * power                   expr ^ expr     (left-associative)
     * -----------------------------------------------------------
     * multiply                expr * expr     (left-associative)
     * divide                  expr / expr     (left-associative)
     * modulo                  expr % expr     (left-associative)
     * -----------------------------------------------------------
     * add (plus)              expr + expr     (left-associative)
     * subtract (minus)        expr - expr     (left-associative)
     * -----------------------------------------------------------
     * shift left              expr << expr    (left-associative)
     * shift right             expr >> expr    (left-associative)
     * unsigned shift right    expr >>> expr   (left-associative)
     * -----------------------------------------------------------
     * and                     expr & expr     (left-associative)
     * -----------------------------------------------------------
     * exclusive or            expr ' expr     (left-associative)
     * -----------------------------------------------------------
     * or                      expr | expr     (left-associative)
     * -----------------------------------------------------------
     * simple assignment       $sym = expr     (right-associative)
     * ------------------------------------------------------- LOW
     * LOW
     */
    ExprEval.prototype.getTermPrecedence0 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence1(lexAn, operationImpl);
        for (;;) // Forever loop.
         {
            var token = lexAn.getNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_BITWISE_OR:
                    term = operationImpl.or(term, this.getTermPrecedence1(lexAn, operationImpl));
                    return term;
                case LexAn_1.TokenType.RP: // Final exit point (result).
                    return term;
                case LexAn_1.TokenType.END: // Final exit point (result).
                    return term;
                default: // Syntax error in the expression,
                    throw new ExprError("syntax error in expression");
            }
        }
    };
    ExprEval.prototype.getTermPrecedence1 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence2(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_BITWISE_XOR:
                    lexAn.getNextToken();
                    term = operationImpl.xor(term, this.getTermPrecedence2(lexAn, operationImpl));
                    return term;
                default:
                    return term;
            }
        }
    };
    ExprEval.prototype.getTermPrecedence2 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence3(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_BITWISE_AND:
                    lexAn.getNextToken();
                    term = operationImpl.and(term, this.getTermPrecedence3(lexAn, operationImpl));
                    return term;
                default:
                    return term;
            }
        }
    };
    ExprEval.prototype.getTermPrecedence3 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence4(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_LEFT_SHIFT: {
                    lexAn.getNextToken();
                    term = operationImpl.leftShift(term, this.getTermPrecedence4(lexAn, operationImpl));
                    break;
                }
                case LexAn_1.TokenType.OP_RIGHT_SHIFT: {
                    lexAn.getNextToken();
                    term = operationImpl.rightShift(term, this.getTermPrecedence4(lexAn, operationImpl));
                    break;
                }
                case LexAn_1.TokenType.OP_UNSIGNED_RIGHT_SHIFT: {
                    lexAn.getNextToken();
                    term = operationImpl.unsignedRightShift(term, this.getTermPrecedence4(lexAn, operationImpl));
                    break;
                }
                default:
                    return term;
            }
        }
    };
    ExprEval.prototype.getTermPrecedence4 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence5(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_PLUS:
                    lexAn.getNextToken();
                    term = operationImpl.add(term, this.getTermPrecedence5(lexAn, operationImpl));
                    break;
                case LexAn_1.TokenType.OP_MINUS:
                    lexAn.getNextToken();
                    term = operationImpl.subtract(term, this.getTermPrecedence5(lexAn, operationImpl));
                    break;
                default:
                    return term;
            }
        }
    };
    ExprEval.prototype.getTermPrecedence5 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence6(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_MULTIPLY:
                    lexAn.getNextToken();
                    term = operationImpl.multiply(term, this.getTermPrecedence6(lexAn, operationImpl));
                    break;
                case LexAn_1.TokenType.OP_DIVIDE: {
                    lexAn.getNextToken();
                    term = operationImpl.divide(term, this.getTermPrecedence6(lexAn, operationImpl));
                    break;
                }
                case LexAn_1.TokenType.OP_MOD: {
                    lexAn.getNextToken();
                    term = operationImpl.modulo(term, this.getTermPrecedence6(lexAn, operationImpl));
                    break;
                }
                default:
                    return term;
            }
        }
    };
    ExprEval.prototype.getTermPrecedence6 = function (lexAn, operationImpl) {
        var term = this.getTermPrecedence7(lexAn, operationImpl);
        for (;;) {
            var token = lexAn.peekNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_POWER:
                    lexAn.getNextToken();
                    term = operationImpl.power(term, this.getTermPrecedence7(lexAn, operationImpl));
                    break;
                default:
                    return term;
            }
        }
    };
    /**
     * Evaluate the terms at the precedence level 8.
     * The following operators are processed:
     * - Number
     * - Unary minus
     * - Unary plus
     * - Not (complement)
     * - Left parenthesis
     * - Variable (plus optional assignment)
     * @param lexAn Lexical analyser to get token from.
     */
    ExprEval.prototype.getTermPrecedence7 = function (lexAn, operationImpl) {
        var token = lexAn.getNextToken();
        switch (token[0]) {
            case LexAn_1.TokenType.NUMBER:
                return operationImpl.assign(token[1]);
            case LexAn_1.TokenType.OP_MINUS:
                return operationImpl.unaryMinus(this.getTermPrecedence7(lexAn, operationImpl));
            case LexAn_1.TokenType.OP_PLUS:
                return operationImpl.unaryPlus(this.getTermPrecedence7(lexAn, operationImpl));
            case LexAn_1.TokenType.OP_BITWISE_NOT:
                return operationImpl.not(this.getTermPrecedence7(lexAn, operationImpl));
            case LexAn_1.TokenType.LP: {
                // Treat the expression after the parentheses as a new expression and evaluate.
                var term = operationImpl.assign(this.getTermPrecedence0(lexAn, operationImpl));
                // Check expression should have ended on a right parentheses.
                if (lexAn.getCurrentToken()[0] != LexAn_1.TokenType.RP) {
                    throw new ExprError(") expected");
                }
                return term;
            }
            case LexAn_1.TokenType.VARIABLE: {
                var variableName = token[1];
                var variableValue = this.variableStore.get(variableName);
                if (variableValue === undefined) {
                    // Variable does not exist, create it.
                    variableValue = 0;
                    this.variableStore.set(variableName, variableValue);
                }
                // Have a look for the assign operator as the next token, if so
                // we process the remainder as a new expression.
                var peekedToken = lexAn.peekNextToken();
                if (peekedToken[0] == LexAn_1.TokenType.OP_ASSIGN) {
                    lexAn.getNextToken(); // Bump past assign token.
                    variableValue = operationImpl.assign(this.getTermPrecedence0(lexAn, operationImpl));
                    this.variableStore.set(variableName, variableValue);
                }
                return operationImpl.assign(variableValue);
            }
            default:
                throw new ExprError("primary expected");
        }
    };
    return ExprEval;
}());
exports.ExprEval = ExprEval;
//# sourceMappingURL=ExprEval.js.map