import { LexAn, TokenType } from "../LexAn"
import { CommandImplementor, CommandParser, CommandError } from "./CommandParser"

/**
 * Fix command parser
 */
export class FixCommandParser implements CommandParser {
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {

        let precision = 2

        let nextToken = lexAn.getNextToken()
        if (nextToken[0] === TokenType.NUMBER) {
            precision = nextToken[1] as number
        } else if (nextToken[0] !== TokenType.END) {
            throw new CommandError("syntax error in command")
        }

        commandImplementor.onCommandFix(precision)
    }

    getUsage(): string {
        return "FIX [precision]"
    }

    getDescription(): string {
        return "Output variables defined in the variables store."
    }
}
