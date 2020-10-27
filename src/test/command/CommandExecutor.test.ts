import { expect, use, spy } from "chai"
import spies from 'chai-spies';
import { CommandExecutor } from "../../command/CommandExecutor"
import { CommandImplementor } from "../../command/CommandParser";

describe("Command Parser API", () => {

    class MockCommandImplementor implements CommandImplementor {
        onCommandExit(): void { }
    }

    let onCommandExitSpy: any
    let cmdParser: CommandExecutor

    beforeEach(() => {
        use(spies)

        let mockCommandImplementor = new MockCommandImplementor()
        onCommandExitSpy = spy.on(mockCommandImplementor, 'onCommandExit')
        cmdParser = new CommandExecutor(mockCommandImplementor)
    });

    it("should parse the exit command and call CommandImplementor.onCommandExit", () => {
        let isCommand = cmdParser.parse("exit")
        expect(onCommandExitSpy).to.have.been.called()
        expect(isCommand).equal(true)
    })

    it("should parse the quit command and call CommandImplementor.onCommandExit", () => {
        let isCommand = cmdParser.parse("quit")
        expect(onCommandExitSpy).to.have.been.called()
        expect(isCommand).equal(true)
    })

    xit("should detect unknown commands and throw an error", () => {
        expect(() => {cmdParser.parse("@ABADCOMMAND")}).to.throw("unknown command \"@ABADCOMMAND\"")
    })

})
