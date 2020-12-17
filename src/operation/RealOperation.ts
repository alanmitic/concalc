import { ExprError, ExprEvalOperation } from "../ExprEval";

/**
 * Real Operation.
 */
export class RealOperation implements ExprEvalOperation {

    assign(value: number): number {
        return value
    }

    unaryMinus(value: number): number {
        return -value
    }

    unaryPlus(value: number): number {
        return value
    }

    add(value1: number, value2: number): number {
        return value1 + value2
    }

    subtract(value1: number, value2: number): number {
        return value1 - value2
    }

    multiply(value1: number, value2: number): number {
        return value1 * value2
    }

    divide(value1: number, value2: number): number {
        if (value2 === 0.0) {
            throw new ExprError("divide by zero")
        }
        return value1 / value2
    }

    power(value1: number, value2: number): number {
        return Math.pow(value1, value2)
    }

    modulo(value1: number, value2: number): number {
        if (value2 === 0.0) {
            throw new ExprError("divide by zero")
        }
        return value1 % value2
    }

    not(value1: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    and(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    or(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    xor(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    leftShift(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    rightShift(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }

    unsignedRightShift(value1: number, value2: number): number {
        throw new ExprError("Operation not supported in real mode!");
    }
}