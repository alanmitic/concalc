/**
 * Result display mode.
 */
export enum ResultMode {
    /** Automatic mode. */
    AUTO,
    /** Fixed point mode. */
    FIXED,
    /** Scientific mode. */
    SCIENTIFIC,
    /** Programmer mode. */
    PROGRAMMER
}

/**
 * Result formatter.
 */
export class ResultFormatter {
    /** Result formatter mode. */
    private mode = ResultMode.AUTO
    /** Result formatter precision. */
    private precision = 2;

    /**
     * Constructor.
     */
    constructor() {
    }

    /**
     * Gets the result formatter mode.
     * @returns Mode.
     */
    getMode(): ResultMode {
        return this.mode
    }

    /**
     * Sets the result formatter mode.
     * @param mode Formatter mode.
     */
    setMode(mode: ResultMode): void {
        this.mode = mode
    }

    /**
     * Gets the result formatter precision
     * @returns Formatter precision
     */
    getPrecision(): number {
        return this.precision
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

            case ResultMode.AUTO:
                formattedValue = value.toString()
                break

            case ResultMode.PROGRAMMER:
                formattedValue = this.formatProgrammerResult(value)
                break
            }

        return formattedValue
    }

    private formatProgrammerResult(value: number): string {

        let binValue = value.toString(2)
        let octValue = value.toString(8)
        let decValue = value.toString(10)
        let hexValue = value.toString(16)


        return binValue +
        " bin, " + octValue + " oct, " + decValue + " dec, " + hexValue + " hex"
    }


}