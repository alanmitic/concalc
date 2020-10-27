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
        console.log("Available Commands:")
        this.commandParserLut.forEach((value, key, map) => {
            console.log(value.getUsage())
        });
    }

    getUsage(): string {
        return "HELP"
    }

    getDescription(): string {
        return "Gets help"
    }
}
