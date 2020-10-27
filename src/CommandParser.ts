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

    constructor(commandImplementor: CommandImplementor) {
        this.commandImplementor = commandImplementor
    }

    parse(commandString: string): boolean {
        let isCommand = false

        let lexAn = new LexAn(commandString)
        let nextToken = lexAn.getNextToken()

        if (nextToken[0] === TokenType.IDENTIFIER) {
            switch(nextToken[1]) {
                case "quit":
                case "exit":
                    this.commandImplementor.onCommandExit()
                    isCommand = true
                    break

                default:
                    isCommand = false
            }
        }

        return isCommand
    }

}