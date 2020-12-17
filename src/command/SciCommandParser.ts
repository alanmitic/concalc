import { LexAn, TokenType } from "../LexAn"
import { CommandImplementor, CommandParser, CommandError } from "./CommandParser"

/**
 * SCI command parser
 */
export class SciCommandParser implements CommandParser {

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

        commandImplementor.onCommandSci(precision)
    }

    /**
     * @override
     */
    getUsage(): string {
        return "SCI [<precision=2>]"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Sets output mode to scientific with the optionally specified precision."
    }
}
