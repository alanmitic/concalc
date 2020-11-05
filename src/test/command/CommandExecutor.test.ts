import { expect, use, spy } from "chai"
import spies from 'chai-spies';
import { CommandExecutor } from "../../command/CommandExecutor"
import { CommandImplementor } from "../../command/CommandParser";

describe("Command Parser API", () => {

    class MockCommandImplementor implements CommandImplementor {
        onCommandVars(): void { }
        onCommandExit(): void { }
        onCommandFix(precision: number): void { }
    }

    let onCommandExitSpy: any
    let onCommandVarsSpy: any
    let onCommandFixSpy: any
    let cmdExec: CommandExecutor

    beforeEach(() => {
        use(spies)

        let mockCommandImplementor = new MockCommandImplementor()
        onCommandVarsSpy = spy.on(mockCommandImplementor, "onCommandVars")
        onCommandExitSpy = spy.on(mockCommandImplementor, "onCommandExit")
        onCommandFixSpy = spy.on(mockCommandImplementor, "onCommandFix")
        cmdExec = new CommandExecutor(mockCommandImplementor)
    });

    it("should parse the exit command and call CommandImplementor.onCommandExit", () => {
        expect(cmdExec.parse("exit")).equal(true)
        expect(onCommandExitSpy).to.have.been.called()
    })

    it("should parse the quit command and call CommandImplementor.onCommandExit", () => {
        expect(cmdExec.parse("quit")).equal(true)
        expect(onCommandExitSpy).to.have.been.called()
    })

    it("should parse the vars command and call CommandImplementor.onCommandVars", () => {
        expect(cmdExec.parse("vars")).equal(true)
        expect(onCommandVarsSpy).to.have.been.called()
    })

    it("should parse the fix command and call CommandImplementor.onCommandFix", () => {
        expect(cmdExec.parse("fix")).equal(true)
        expect(onCommandFixSpy).to.have.been.called.with(2)
    })

    it("should parse the fix with precision command and call CommandImplementor.onCommandFix", () => {
        expect(cmdExec.parse("fix 5")).equal(true)
        expect(onCommandFixSpy).to.have.been.called.with(5)
    })

    it("should throw an error for a badly formed fix command", () => {
        expect(() => {cmdExec.parse("fix abcd")}).to.throw("syntax error in command")
    })

    xit("should detect unknown commands and throw an error", () => {
        expect(() => {cmdExec.parse("@ABADCOMMAND")}).to.throw("unknown command \"@ABADCOMMAND\"")
    })

})
