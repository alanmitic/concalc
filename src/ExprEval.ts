import { LexAn, Token, TokenType } from "./LexAn"

export type VariableStore = Map<String, number>;

export class ExprException {
    constructor(message: string) {

    }
}

/**
 * Expression Evaluator.
 */
export class ExprEval {
    /** Variable store. */
    variableStore: VariableStore

    constructor(variableStore: VariableStore) {
        this.variableStore = variableStore
    }

    evaluate(expression: string): number {
        let lexAn: LexAn = new LexAn(expression);
        return this.getTermPrecedence0(lexAn)
    }

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
    private getTermPrecedence0(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence1(lexAn)

        for (; ;)	// Forever loop.
        {
            let token: Token = lexAn.getNextToken()

            switch (token[0]) {
                // case CLex::OP_BITWISE_OR:
                // 	LeftTerm = (long)LeftTerm | (long)GetTerm(Precedence + 1);
                // 	break;

                case TokenType.RP: // Final exit point (result).
                    return term;

                case TokenType.END: // Final exit point (result).
                    return term;

                default: // Systax error in the expression,
                    throw new ExprException("syntax error in expression");
            }
        }
    }

    private getTermPrecedence1(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence2(lexAn)

        return term
    }

    private getTermPrecedence2(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence3(lexAn)

        return term
    }

    private getTermPrecedence3(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence4(lexAn)

        return term
    }

    private getTermPrecedence4(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence5(lexAn)

        return term
    }

    private getTermPrecedence5(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence6(lexAn)

        return term
    }

    private getTermPrecedence6(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence7(lexAn)

        return term
    }

    private getTermPrecedence7(lexAn: LexAn): number {
        let term: number = this.getTermPrecedence8(lexAn)
        for (; ;) {
            let token: Token = lexAn.getNextToken()
            switch (token[0]) {
                case TokenType.OP_POWER:
                    term = Math.pow(term, this.getTermPrecedence8(lexAn));
                    break;

                default:
                    return term;
            }
        }
    }

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
    private getTermPrecedence8(lexAn: LexAn): number {
        let token: Token = lexAn.getNextToken()
        switch (token[0]) {
            case TokenType.NUMBER:
                return token[1] as number

            case TokenType.OP_MINUS:
                return -this.getTermPrecedence8(lexAn)

            case TokenType.OP_PLUS:
                return this.getTermPrecedence8(lexAn)

            case TokenType.OP_BITWISE_NOT:
                return ~this.getTermPrecedence8(lexAn)

            case TokenType.LP: {
                // Treat the expression after the parentheses as a new expression and evaluate.
                let term = this.getTermPrecedence0(lexAn)

                // Check expression should have ended on a right parentheses.
                if ((lexAn.getCurrentToken() as Token)[0] != TokenType.RP) {
                    throw new ExprException(") expected");
                }

                return term;
            }

            case TokenType.VARIABLE: {
                let variableName = token[1] as string;
                let variableValue = this.variableStore.get(variableName)
                if (variableValue === undefined) {
                    // Variable does not exist, create it.
                    variableValue = 0;
                    this.variableStore.set(variableName, variableValue)
                }

                // Have a look for the assing operator as the next token, if so
                // we process the remainder as a new expression.
                let peekedToken = lexAn.peekNextToken()
                if (peekedToken[0] == TokenType.OP_ASSIGN) {
                    lexAn.getNextToken() // Bump past assign token.
                    variableValue = this.getTermPrecedence0(lexAn)
                    this.variableStore.set(variableName, variableValue)
                }

                return variableValue as number
            }


            default:
                throw new ExprException("primary expected");
        }
    }

}