import { ExprError, ExprEvalOperation } from "../ExprEval";

/**
 * Programmer Operation.
 */
export class ProgOperation implements ExprEvalOperation {

    /** Current number of bits to use in calculations. */
    private bits: number

    /**
     * Constructs a programmers operation implementation.
     * @param bits Number of bits to use in calculations.
     */
    constructor(bits: number) {
        this.bits = bits
    }

    setBits(bits: number): void {
        this.bits = bits
    }

    /**
     * @override
     */
    assign(value: number): number {
        return this.truncate(value)
    }

    /**
     * @override
     */
    unaryMinus(value: number): number {
        return this.truncate(-value)
    }

    /**
     * @override
     */
    unaryPlus(value: number): number {
        return this.truncate(value)
    }

    /**
     * @override
     */
    add(value1: number, value2: number): number {
        return this.truncate(value1) + this.truncate(value2)
    }

    /**
     * @override
     */
    subtract(value1: number, value2: number): number {
        return this.truncate(value1) - this.truncate(value2)
    }

    /**
     * @override
     */
    multiply(value1: number, value2: number): number {
        return this.truncate(value1) * this.truncate(value2)
    }

    /**
     * @override
     */
    divide(value1: number, value2: number): number {
        if (this.truncate(value2) === 0.0) {
            throw new ExprError("divide by zero")
        }
        return this.truncate(value1) / this.truncate(value2)
    }

    /**
     * @override
     */
    power(value1: number, value2: number): number {
        return Math.pow(this.truncate(value1), this.truncate(value2))
    }

    /**
     * @override
     */
    modulo(value1: number, value2: number): number {
        if (this.truncate(value2) === 0.0) {
            throw new ExprError("divide by zero")
        }
        return this.truncate(value1) % this.truncate(value2)
    }

    /**
     * @override
     */
    not(value1: number): number {
        return ~this.truncate(value1)
    }

    /**
     * @override
     */
    and(value1: number, value2: number): number {
        return this.truncate(value1) & this.truncate(value2)
    }

    /**
     * @override
     */
    or(value1: number, value2: number): number {
        return this.truncate(value1) | this.truncate(value2)
    }

    /**
     * @override
     */
    xor(value1: number, value2: number): number {
        return this.truncate(value1) ^ this.truncate(value2)
    }

    /**
     * @override
     */
    leftShift(value1: number, value2: number): number {
        let shiftValue = this.truncate(value2)
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprError("out of range shift value")
        }
        return this.truncate(value1) << shiftValue
    }

    /**
     * @override
     */
    rightShift(value1: number, value2: number): number {
        let shiftValue = this.truncate(value2)
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprError("out of range shift value")
        }
        return this.truncate(value1) >> shiftValue
    }

    /**
     * @override
     */
    unsignedRightShift(value1: number, value2: number): number {
        let shiftValue = this.truncate(value2)
        if (shiftValue < 0 || shiftValue > 31) {
            throw new ExprError("out of range shift value")
        }
        return this.truncate(value1) >>> shiftValue
    }

    /**
     * Checks if the supplied bit size is supported.
     * @param bits Number of bits to check.
     * @returns true if supported, else false.
     */
    static isSupportedBitSize(bits: number): boolean {
        return bits === 8 || bits === 16 || bits === 32
    }

    /**
     * Truncates the supplied value to the current number of bits.
     * @param value Value to truncated.
     * @returns truncated value.
     */
    private truncate(value: number) {
        let intValue = Math.trunc(value)
        let bitMask = this.generateBitMask()
        let signBit = 1 << (this.bits - 1)

        intValue = intValue & bitMask

        let isNegative = (signBit & intValue) !== 0
        if (isNegative && intValue > 0) {
            intValue = -intValue
        }

        return intValue
    }

    /**
     * Generated a bit mask to mask off the bits based on the current bit size.
     * @returns bit mask.
     */
    private generateBitMask() : number {
        let mask = 0
        for (let i = 0; i < this.bits; i++) {
            mask |= (1 << i)
        }
        return mask
    }

}