import { strict } from "assert";

export enum ResultMode {
    GENERAL,
    FIXED,
    SCIENTIFIC
}

export enum ResultBase {
    OCT,
    DEC,
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