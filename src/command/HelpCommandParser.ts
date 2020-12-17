import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser, CommandParserLookupTable } from "./CommandParser"

/**
 * HELP command parser
 */
export class HelpCommandParser implements CommandParser {
    /** Command parser lookup table. */
    commandParserLut: Map<string, CommandParser>

    /**
     * Constructs a HELP command parser, with the command held in the command parser lookup table.
     * @param commandParserLut Command parser lookup table.
     */
    constructor(commandParserLut: CommandParserLookupTable) {
        this.commandParserLut = commandParserLut
    }

    /**
     * @override
     */
    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        console.log("\nThe following commands are available:")
        this.commandParserLut.forEach((value, key, map) => {
            console.log(" - " + value.getUsage() + " : " + value.getDescription())
        });
    }

    /**
     * @override
     */
    getUsage(): string {
        return "HELP"
    }

    /**
     * @override
     */
    getDescription(): string {
        return "Displays help."
    }
}
