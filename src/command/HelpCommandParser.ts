import { LexAn } from "../LexAn"
import { CommandImplementor, CommandParser, CommandParserLookupTable } from "./CommandParser"

/**
 * Help command parser
 */
export class HelpCommandParser implements CommandParser {


    commandParserLut :Map<string, CommandParser>

    constructor(commandParserLut: CommandParserLookupTable) {
        this.commandParserLut = commandParserLut
    }

    parse(lexAn: LexAn, commandImplementor: CommandImplementor): void {
        console.log("\nThe following commands are available:")
        this.commandParserLut.forEach((value, key, map) => {
            console.log(" - " + value.getUsage() + " : " + value.getDescription())
        });
    }

    getUsage(): string {
        return "HELP"
    }

    getDescription(): string {
        return "Displays help."
    }
}
