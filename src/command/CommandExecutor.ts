import { LexAn, TokenType } from "../LexAn"
import { CommandImplementor, CommandParserLookupTable } from "./CommandParser"
import { ExitCommandParser } from "./ExitCommandParser"
import { HelpCommandParser } from "./HelpCommandParser"
import { VarsCommandParser } from "./VarsCommandParser"
import { FixCommandParser } from "./FixCommandParser"
import { SciCommandParser } from "./SciCommandParser"
import { RealCommandParser } from "./RealCommandParser"
import { ProgCommandParser } from "./ProgCommandParser"

/**
 * Command executor.  Parses the command using the lexical analyser then executed the appropriate implementation method.
 */
export class CommandExecutor {
    /** Command implementor. */
    commandImplementor: CommandImplementor
    /** Command parser lookup table.  */
    commandParserLut: CommandParserLookupTable = new Map()

    /**
     * Constructs a command executor and uses the supplied command implementor to execute the commands.
     * @param commandImplementor Command implementor.
     */
    constructor(commandImplementor: CommandImplementor) {
        this.commandImplementor = commandImplementor

        // Build the lookup table of command parsers.
        this.commandParserLut.set("EXIT", new ExitCommandParser(false))
        this.commandParserLut.set("HELP", new HelpCommandParser(this.commandParserLut))
        this.commandParserLut.set("QUIT", new ExitCommandParser(true))
        this.commandParserLut.set("VARS", new VarsCommandParser())
        this.commandParserLut.set("FIX", new FixCommandParser())
        this.commandParserLut.set("SCI", new SciCommandParser())
        this.commandParserLut.set("REAL", new RealCommandParser())
        this.commandParserLut.set("PROG", new ProgCommandParser())
    }

    /**
     * Checks if the command string contains a command, if it does attempts to parse and execute it.  if no command
     * found it returns false.
     * @param commandString command string to parse.
     * @returns true if command found, else false.
     * @throws {CommandError} Command error.
     */
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
