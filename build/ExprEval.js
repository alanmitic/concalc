"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExprEval = exports.ExprException = void 0;
var LexAn_1 = require("./LexAn");
var ExprException = /** @class */ (function () {
    function ExprException(message) {
    }
    return ExprException;
}());
exports.ExprException = ExprException;
/**
 * Expression Evaluator.
 */
var ExprEval = /** @class */ (function () {
    function ExprEval(variableStore) {
        this.variableStore = variableStore;
    }
    ExprEval.prototype.evaluate = function (expression) {
        var lexAn = new LexAn_1.LexAn(expression);
        return this.getTermPrecedence0(lexAn);
    };
    /**
     * 	This method evaluates term(s) in an expression, taking into account
     * operator precedence.
     *
     * HIGH
     *
     * Operator Name         | Operator      | Associative
     * ---------------------------------------------------
     * unary minus           | - expr        | (right-associative)
     * unary plus            | + expr        | (right-associative)
     * not (complement)      | ~ expr        | (right-associative)
     * -----------------------------------------------------------
     * power                   expr ^ expr     (left-associative)
     * -----------------------------------------------------------
     * multipy                 expr * expr     (left-associative)
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
     * -----------------------------------------------------------
     *
     * LOW
     */
    ExprEval.prototype.getTermPrecedence0 = function (lexAn) {
        var term = this.getTermPrecedence1(lexAn);
        for (;;) // Forever loop.
         {
            var token = lexAn.getNextToken();
            switch (token[0]) {
                // case CLex::OP_BITWISE_OR:
                // 	LeftTerm = (long)LeftTerm | (long)GetTerm(Precedence + 1);
                // 	break;
                case LexAn_1.TokenType.RP: // Final exit point (result).
                    return term;
                case LexAn_1.TokenType.END: // Final exit point (result).
                    return term;
                default: // Systax error in the expression,
                    throw new ExprException("syntax error in expression");
            }
        }
    };
    ExprEval.prototype.getTermPrecedence1 = function (lexAn) {
        var term = this.getTermPrecedence2(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence2 = function (lexAn) {
        var term = this.getTermPrecedence3(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence3 = function (lexAn) {
        var term = this.getTermPrecedence4(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence4 = function (lexAn) {
        var term = this.getTermPrecedence5(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence5 = function (lexAn) {
        var term = this.getTermPrecedence6(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence6 = function (lexAn) {
        var term = this.getTermPrecedence7(lexAn);
        return term;
    };
    ExprEval.prototype.getTermPrecedence7 = function (lexAn) {
        var term = this.getTermPrecedence8(lexAn);
        for (;;) {
            var token = lexAn.getNextToken();
            switch (token[0]) {
                case LexAn_1.TokenType.OP_POWER:
                    term = Math.pow(term, this.getTermPrecedence8(lexAn));
                    break;
                default:
                    return term;
            }
        }
    };
    /**
     * Evalulate the terms at the precedence level 8.
     * The following operators are processed:
     * - Number
     * - Unary minus
     * - Unary plus
     * - Not (complement)
     * - Left parenthesis
     * - Variable (plus optional assignment)
     * @param lexAn Lexical analyser to get token from.
     */
    ExprEval.prototype.getTermPrecedence8 = function (lexAn) {
        var token = lexAn.getNextToken();
        switch (token[0]) {
            case LexAn_1.TokenType.NUMBER:
                return token[1];
            case LexAn_1.TokenType.OP_MINUS:
                return -this.getTermPrecedence8(lexAn);
            case LexAn_1.TokenType.OP_PLUS:
                return this.getTermPrecedence8(lexAn);
            case LexAn_1.TokenType.OP_BITWISE_NOT:
                return ~this.getTermPrecedence8(lexAn);
            case LexAn_1.TokenType.LP:
                // Treat the expression after the parentheses as a new expression and evaluate.
                var term = this.getTermPrecedence0(lexAn);
                // Check expression should have ended on a right parentheses.
                if (lexAn.getCurrentToken()[0] != LexAn_1.TokenType.RP) {
                    throw new ExprException(") expected");
                }
                return term;
            // case TokenType.VARIABLE:
            //     // Extract symbol value from global symbol table.
            //     double &v = (*m_pGlobalSymTab)[m_pLex->m_StringValue];
            //     // Get the next token, so that the token type of the next token
            //     // is available to the caller of this function. If we have an
            //     // assign "=" then process the terms after the assign to
            //     // determine the value of the symbol.
            //     if(m_pLex->GetToken() == CLex::OP_ASSIGN)
            //         v = GetTerm();
            //     // Return the value of the symbol.
            //     return v;
            default:
                throw new ExprException("primary expected");
        }
    };
    return ExprEval;
}());
exports.ExprEval = ExprEval;
//# sourceMappingURL=ExprEval.js.map