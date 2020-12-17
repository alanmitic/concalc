import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser } from "./CommandParser"

/**
 * EXIT/QUIT command parser
 */
export class ExitCommandParser implements CommandParser {
    /** Flag to indicate if this is the QUIT command. */
    isQuit: boolean

    /**
     * Constructs an EXIT (or QUIT) command parser.
     * @param isQuit true if quit command else false.
     */
    constructor(isQuit: boolean) {
        this.isQuit = isQuit
    }

    /**
     * @override
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        commandImplementor.onCommandExit()
    }

    /**
     * @override
     */
    getUsage(): string {
        return this.isQuit ? "QUIT" : "EXIT"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Exits concalc application."
    }
}
