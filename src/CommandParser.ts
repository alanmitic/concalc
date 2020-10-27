import { LexAn, Token, TokenType } from "./LexAn"

export interface CommandImplementor {
    onCommandExit(): void
}

export class CommandError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "CommandError"
    }
}

export class CommandParser {
    commandImplementor: CommandImplementor

    commandParserMap: Map<string, SpecificCommandParser> = new Map()

    constructor(commandImplementor: CommandImplementor) {
        this.commandImplementor = commandImplementor

        this.commandParserMap.set("EXIT", new ExitCommandParser())
        this.commandParserMap.set("QUIT", new ExitCommandParser())
    }

    parse(commandString: string): boolean {
        let isCommand = false

        let lexAn = new LexAn(commandString)
        let nextToken = lexAn.getNextToken()

        if (nextToken[0] === TokenType.IDENTIFIER) {
            let commandName: string = (nextToken[1] as string).toUpperCase()
            let specificCommandParser = this.commandParserMap.get(commandName)
            if (specificCommandParser !== undefined) {
                isCommand = true
                specificCommandParser.parse(lexAn, this.commandImplementor)
            }
        }

        return isCommand
    }
}

interface SpecificCommandParser {
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void
}

class ExitCommandParser implements SpecificCommandParser {
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        commandImplementor.onCommandExit()
    }
}

