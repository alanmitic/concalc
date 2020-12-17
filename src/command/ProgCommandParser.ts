import { LexAn, TokenType } from "../LexAn"
import { ProgOperation } from "../operation/ProgOperation"
import { CommandImplementor, CommandParser, CommandError } from "./CommandParser"

/**
 * PROG command parser
 */
export class ProgCommandParser implements CommandParser {

    /**
     * @override
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {

        let bits = 32

        let nextToken = lexAn.getNextToken()
        if (nextToken[0] === TokenType.NUMBER) {
            bits = nextToken[1] as number
        } else if (nextToken[0] !== TokenType.END) {
            throw new CommandError("syntax error in command")
        }

        if (!ProgOperation.isSupportedBitSize(bits)) {
            throw new CommandError("invalid bit size")
        }

        commandImplementor.onCommandProg(bits)
    }

    /**
     * @override
     */
    getUsage(): string {
        return "PROG [<bits=32>]"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Sets output mode to programmer with the specified number of bits."
    }
}
