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

/**
 * Result formatter.
 */
export class ResultFormatter {
    /** Result formatter mode. */
    mode = ResultMode.GENERAL
    /** Result formatter base. */
    base = ResultBase.DEC
    /** Result formatter precision. */
    precision = 2;

    /**
     * Constructor.
     */
    constructor() {
    }

    /**
     * Sets the result formatter mode.
     * @param mode Formatter mode.
     */
    setMode(mode: ResultMode): void {
        this.mode = mode
    }

    /**
     * Sets the result formatter precision.
     * @param precision Precision.
     */
    setPrecision(precision: number): void {
        this.precision = precision
    }

    /**
     * Formats the number into a string.
     * @param value Number to format.
     */
    format(value: number): string {
        let formattedValue: string
        switch (this.mode) {
            case ResultMode.FIXED:
                formattedValue = value.toFixed(this.precision)
                break

            case ResultMode.SCIENTIFIC:
                formattedValue = value.toExponential(this.precision)
                break

            case ResultMode.GENERAL:
                formattedValue = value.toString()
                break
        }

        return formattedValue
    }
}