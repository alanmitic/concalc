import { LexAn, TokenType } from "../LexAn"
import { CommandImplementor, CommandParser, CommandError } from "./CommandParser"

/**
 * REAL command parser
 */
export class RealCommandParser implements CommandParser {

    /**
     * @override
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {

        let nextToken = lexAn.getNextToken()
        if (nextToken[0] !== TokenType.END) {
            throw new CommandError("syntax error in command")
        }

        commandImplementor.onCommandReal()
    }

    /**
     * @override
     */
    getUsage(): string {
        return "REAL"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Sets output mode to real (default mode of operation)."
    }
}
