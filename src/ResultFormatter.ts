/**
 * Result display mode.
 */
export enum ResultMode {
    /** General automatic mode. */
    GENERAL,
    /** Fixed point mode. */
    FIXED,
    /** Scientific mode. */
    SCIENTIFIC
}

/**
 * Result base.
 */
export enum ResultBase {
    /** Octal base. */
    OCT,
    /** Decimal base. */
    DEC,
    /**Hexadecimal base. */
    HEX
}

export class ResultFormatter {

    mode = ResultMode.GENERAL
    base = ResultBase.DEC
    fixedPrecision = 2;

    constructor() {

    }

    format(value: number) : string {
        return value.toString()
    }

}