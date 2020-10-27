import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser } from "./CommandParser"

/**
 * Vars command parser
 */
export class VarsCommandParser implements CommandParser {
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        commandImplementor.onCommandVars()
    }

    getUsage(): string {
        return "VARS"
    }

    getDescription(): string {
        return "Output variables"
    }
}
