import { LexAn } from "../LexAn";

export type CommandParserLookupTable = Map<string, CommandParser>

export interface CommandImplementor {
    onCommandExit(): void
}

export class CommandError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "CommandError"
    }
}


export interface CommandParser {
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void
    getUsage() : string
    getDescription(): string
}

