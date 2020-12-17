import { LexAn, LexAnError, Token, TokenType } from "./LexAn"
import { ProgOperation } from "./operation/ProgOperation";
import { RealOperation } from "./operation/RealOperation";

export type VariableStore = Map<String, number>;

export class ExprError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "ExprError"
    }
}

/**
 * Operating mode.
 */
export enum OperatingMode {
    /** Real mode (Default). */
    REAL = 0,
    /** Programmers mode. */
    PROGRAMMER
}

export interface ExprEvalOperation {
    assign(value: number): number
    unaryMinus(value: number): number
    unaryPlus(value: number): number
    add(value1: number, value2: number): number
    subtract(value1: number, value2: number): number
    multiply(value1: number, value2: number): number
    divide(value1: number, value2: number): number
    power(value1: number, value2: number): number
    modulo(value1: number, value2: number): number
    not(value1: number): number
    and(value1: number, value2: number): number
    or(value1: number, value2: number): number
    xor(value1: number, value2: number): number
    leftShift(value1: number, value2: number): number
    rightShift(value1: number, value2: number): number
    unsignedRightShift(value1: number, value2: number): number
}

/**
 * Expression Evaluator.
 */
export class ExprEval {
    /** Variable store. */
    private variableStore: VariableStore
    /** Operating mode. */
    private operatingMode: OperatingMode = OperatingMode.REAL
    /** Operation implementations */
    private operationImpls: ExprEvalOperation[]

    constructor(variableStore: VariableStore) {
        this.variableStore = variableStore
        this.operationImpls = [new RealOperation(), new ProgOperation(32)]
    }

    /**
     * Gets the operating mode.
     * @return Operating mode.
     */
    getOperatingMode(): OperatingMode {
        return this.operatingMode
    }

    /**
     * Sets the operating mode.
     * @param operatingMode New operating mode.
     */
    setOperatingMode(operatingMode: OperatingMode) {
        this.operatingMode = operatingMode
    }

    evaluate(expression: string): number {
        try {
            let lexAn: LexAn = new LexAn(expression)
            return this.getTermPrecedence0(lexAn, this.operationImpls[this.operatingMode])
        } catch (lexAnError) {
            throw new ExprError(lexAnError.message)
        }
    }

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
    private getTermPrecedence0(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence1(lexAn, operationImpl)

        for (; ;)	// Forever loop.
        {
            let token: Token = lexAn.getNextToken()

            switch (token[0]) {
                case TokenType.OP_BITWISE_OR:
                    term = operationImpl.or(term, this.getTermPrecedence1(lexAn, operationImpl))
                    return term

                case TokenType.RP: // Final exit point (result).
                    return term

                case TokenType.END: // Final exit point (result).
                    return term

                default: // Syntax error in the expression,
                    throw new ExprError("syntax error in expression")
            }
        }
    }

    private getTermPrecedence1(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence2(lexAn, operationImpl)

        for (; ;) {
            let token: Token = lexAn.peekNextToken()

            switch (token[0]) {
                case TokenType.OP_BITWISE_XOR:
                    lexAn.getNextToken()
                    term = operationImpl.xor(term, this.getTermPrecedence2(lexAn, operationImpl))
                    return term

                default:
                    return term
            }
        }
    }

    private getTermPrecedence2(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence3(lexAn, operationImpl)

        for (; ;) {
            let token: Token = lexAn.peekNextToken()
            switch (token[0]) {
                case TokenType.OP_BITWISE_AND:
                    lexAn.getNextToken()
                    term = operationImpl.and(term, this.getTermPrecedence3(lexAn, operationImpl))
                    return term

                default:
                    return term
            }
        }
    }

    private getTermPrecedence3(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence4(lexAn, operationImpl)
        for (; ;) {
            let token: Token = lexAn.peekNextToken()
            switch (token[0]) {
                case TokenType.OP_LEFT_SHIFT: {
                    lexAn.getNextToken()
                    term = operationImpl.leftShift(term, this.getTermPrecedence4(lexAn, operationImpl))
                    break
                }

                case TokenType.OP_RIGHT_SHIFT: {
                    lexAn.getNextToken()
                    term = operationImpl.rightShift(term, this.getTermPrecedence4(lexAn, operationImpl))
                    break
                }

                case TokenType.OP_UNSIGNED_RIGHT_SHIFT: {
                    lexAn.getNextToken()
                    term = operationImpl.unsignedRightShift(term, this.getTermPrecedence4(lexAn, operationImpl))
                    break
                }

                default:
                    return term
            }
        }
    }

    private getTermPrecedence4(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence5(lexAn, operationImpl)

        for (; ;) {
            let token: Token = lexAn.peekNextToken()
            switch (token[0]) {
                case TokenType.OP_PLUS:
                    lexAn.getNextToken()
                    term = operationImpl.add(term, this.getTermPrecedence5(lexAn, operationImpl))
                    break

                case TokenType.OP_MINUS:
                    lexAn.getNextToken()
                    term = operationImpl.subtract(term, this.getTermPrecedence5(lexAn, operationImpl))
                    break

                default:
                    return term
            }
        }
    }

    private getTermPrecedence5(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence6(lexAn, operationImpl)
        for (; ;) {
            let token: Token = lexAn.peekNextToken()
            switch (token[0]) {
                case TokenType.OP_MULTIPLY:
                    lexAn.getNextToken()
                    term = operationImpl.multiply(term, this.getTermPrecedence6(lexAn, operationImpl))
                    break

                case TokenType.OP_DIVIDE: {
                    lexAn.getNextToken()
                    term = operationImpl.divide(term, this.getTermPrecedence6(lexAn, operationImpl))
                    break
                }

                case TokenType.OP_MOD: {
                    lexAn.getNextToken()
                    term = operationImpl.modulo(term, this.getTermPrecedence6(lexAn, operationImpl))
                    break
                }

                default:
                    return term
            }
        }
    }

    private getTermPrecedence6(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let term: number = this.getTermPrecedence7(lexAn, operationImpl)
        for (; ;) {
            let token: Token = lexAn.peekNextToken()
            switch (token[0]) {
                case TokenType.OP_POWER:
                    lexAn.getNextToken()
                    term = operationImpl.power(term, this.getTermPrecedence7(lexAn, operationImpl))
                    break

                default:
                    return term
            }
        }
    }

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
    private getTermPrecedence7(lexAn: LexAn, operationImpl: ExprEvalOperation): number {
        let token: Token = lexAn.getNextToken()
        switch (token[0]) {
            case TokenType.NUMBER:
                return operationImpl.assign(token[1] as number)

            case TokenType.OP_MINUS:
                return operationImpl.unaryMinus(this.getTermPrecedence7(lexAn, operationImpl))

            case TokenType.OP_PLUS:
                return operationImpl.unaryPlus(this.getTermPrecedence7(lexAn, operationImpl))

            case TokenType.OP_BITWISE_NOT:
                return operationImpl.not(this.getTermPrecedence7(lexAn, operationImpl))

            case TokenType.LP: {
                // Treat the expression after the parentheses as a new expression and evaluate.
                let term = operationImpl.assign(this.getTermPrecedence0(lexAn, operationImpl))

                // Check expression should have ended on a right parentheses.
                if ((lexAn.getCurrentToken() as Token)[0] != TokenType.RP) {
                    throw new ExprError(") expected")
                }

                return term
            }

            case TokenType.VARIABLE: {
                let variableName = token[1] as string
                let variableValue = this.variableStore.get(variableName)
                if (variableValue === undefined) {
                    // Variable does not exist, create it.
                    variableValue = 0
                    this.variableStore.set(variableName, variableValue)
                }

                // Have a look for the assign operator as the next token, if so
                // we process the remainder as a new expression.
                let peekedToken = lexAn.peekNextToken()
                if (peekedToken[0] == TokenType.OP_ASSIGN) {
                    lexAn.getNextToken() // Bump past assign token.
                    variableValue = operationImpl.assign(this.getTermPrecedence0(lexAn, operationImpl))
                    this.variableStore.set(variableName, variableValue)
                }

                return operationImpl.assign(variableValue as number)
            }

            default:
                throw new ExprError("primary expected")
        }
    }

}