import { expect, use, spy } from "chai"
import spies from 'chai-spies';
import { CommandParser, CommandImplementor } from "../CommandParser"

describe("Command Parser API", () => {

    class MockCommandImplementor implements CommandImplementor {
        onCommandExit(): void { }
    }

    let onCommandExitSpy: any
    let cmdParser: CommandParser

    beforeEach(() => {
        use(spies)

        let mockCommandImplementor = new MockCommandImplementor()
        onCommandExitSpy = spy.on(mockCommandImplementor, 'onCommandExit')
        cmdParser = new CommandParser(mockCommandImplementor)
    });

    it("should parse the exit command and call CommandImplementor.onCommandExit", () => {
        cmdParser.parse("exit")
        expect(onCommandExitSpy).to.have.been.called();
    })

    it("should parse the quit command and call CommandImplementor.onCommandExit", () => {
        cmdParser.parse("quit")
        expect(onCommandExitSpy).to.have.been.called();
    })

    xit("should detect unknown commands and throw an error", () => {
        expect(() => {cmdParser.parse("@ABADCOMMAND")}).to.throw("unknown command \"@ABADCOMMAND\"")
    })

})
