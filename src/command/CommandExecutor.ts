import { LexAn, Token, TokenType } from "../LexAn"
import { CommandImplementor, CommandParser, CommandParserLookupTable } from "./CommandParser"
import { ExitCommandParser } from "./ExitCommandParser"
import { HelpCommandParser } from "./HelpCommandParser"

export class CommandExecutor {
    commandImplementor: CommandImplementor

    commandParserLut: CommandParserLookupTable = new Map()

    constructor(commandImplementor: CommandImplementor) {
        this.commandImplementor = commandImplementor

        this.commandParserLut.set("EXIT", new ExitCommandParser(false))
        this.commandParserLut.set("HELP", new HelpCommandParser(this.commandParserLut))
        this.commandParserLut.set("QUIT", new ExitCommandParser(true))
        // VARS -> Dumps variables in the variable store.
        // FIX ->
        // SCI ->
        // GEN ->
        // HEX ->
        // DEC ->
        // OCT ->
        // HELP ->
    }

    parse(commandString: string): boolean {
        let isCommand = false

        let lexAn = new LexAn(commandString)
        let nextToken = lexAn.getNextToken()

        if (nextToken[0] === TokenType.IDENTIFIER) {
            let commandName: string = (nextToken[1] as string).toUpperCase()
            let specificCommandParser = this.commandParserLut.get(commandName)
            if (specificCommandParser !== undefined) {
                isCommand = true
                specificCommandParser.parse(lexAn, this.commandImplementor)
            }
        }

        return isCommand
    }
}


