import { LexAn, TokenType } from "../LexAn"
import { CommandImplementor, CommandParser, CommandError } from "./CommandParser"

/**
 * FIX command parser
 */
export class FixCommandParser implements CommandParser {

    /**
     * @override
     */
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

    /**
     * @override
     */
    getUsage(): string {
        return "FIX [<precision=2>]"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Sets output mode to fixed point with the optionally specified precision."
    }
}
