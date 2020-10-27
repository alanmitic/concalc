import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser } from "./CommandParser"

/**
 * Exit/Quit command parser
 */
export class ExitCommandParser implements CommandParser {
    isQuit: boolean

    constructor(isQuit: boolean) {
        this.isQuit = isQuit
    }

    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        commandImplementor.onCommandExit()
    }

    getUsage(): string {
        return this.isQuit ? "QUIT" : "EXIT"
    }

    getDescription(): string {
        return "Exits concalc application."
    }
}
