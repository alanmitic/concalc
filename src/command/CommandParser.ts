import { LexAn } from "../LexAn"

/**
 * Command parser lookup tables, maps command name to specific command parser implementation.
 */
export type CommandParserLookupTable = Map<string, CommandParser>

/**
 * Command implementor interface, the parser will call the implementor through this interface.
 */
export interface CommandImplementor {

    /**
     * EXIT command interface.
     */
    onCommandExit(): void

    /**
     * VARS command interface.
     */
    onCommandVars(): void

    /**
     * FIX command interface.
     * @param precision Fixed point output precision.
     */
    onCommandFix(precision: number): void

    /**
     * SCI command interface.
     * @param precision Scientific output precision.
     */
    onCommandSci(precision: number): void

    /**
     * REAL command interface.
     */
    onCommandReal(): void

    /**
     * PROG command interface.
     * @param bits Number of bits (can be 8, 16 or 32).
     */
    onCommandProg(bits: number): void
}

/**
 * Command error.
 */
export class CommandError extends Error {

    /**
     * Constructs command error with specified message.
     * @param message Error message.
     */
    constructor(message: string) {
        super(message)
        this.name = "CommandError"
    }
}

/**
 * Command parser interface, each specific command parser must implement this interface.
 */
export interface CommandParser {

    /**
     * Parse this command.
     * @param lexAn Lexical analyser used for parsing.
     * @param commandImplementor Command implementor.
     * @throws {CommandError} Command error.
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void

    /**
     * Gets the command usage string.
     */
    getUsage(): string

    /**
     * Gets the command description string.
     */
    getDescription(): string
}
