import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser } from "./CommandParser"

/**
 * VARS command parser
 */
export class VarsCommandParser implements CommandParser {

    /**
     * @override
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        commandImplementor.onCommandVars()
    }

    /**
     * @override
     */
    getUsage(): string {
        return "VARS"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Output variables defined in the variables store."
    }
}
