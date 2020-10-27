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

export class CommandExecutor {
    commandImplementor: CommandImplementor

    constructor(commandImplementor: CommandImplementor) {
        this.commandImplementor = commandImplementor
    }

    execute(commandString: string) {
        let lexAn = new LexAn(commandString)
        let nextToken = lexAn.getNextToken()

        if (nextToken[0] !== TokenType.COMMAND) {
            throw new CommandError("expected command type")
        }

        switch(nextToken[1]) {
            case "@quit":
            case "@exit":
                this.commandImplementor.onCommandExit()
                break

            default:
                throw new CommandError("unknown command " + nextToken[1])
        }
    }

}