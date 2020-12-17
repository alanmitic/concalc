import { expect, use, spy } from "chai"
import spies from 'chai-spies';
import { CommandExecutor } from "../../command/CommandExecutor"
import { CommandImplementor } from "../../command/CommandParser";

describe("Command Parser API", () => {

    class MockCommandImplementor implements CommandImplementor {
        onCommandExit(): void { }
        onCommandVars(): void { }
        onCommandFix(precision: number): void { }
        onCommandSci(precision: number): void { }
        onCommandReal(): void { }
        onCommandProg(bits: number): void { }
    }

    let onCommandExitSpy: any
    let onCommandVarsSpy: any
    let onCommandFixSpy: any
    let onCommandSciSpy: any
    let onCommandRealSpy: any
    let onCommandProgSpy: any
    let cmdExec: CommandExecutor

    beforeEach(() => {
        use(spies)

        let mockCommandImplementor = new MockCommandImplementor()
        onCommandExitSpy = spy.on(mockCommandImplementor, "onCommandExit")
        onCommandVarsSpy = spy.on(mockCommandImplementor, "onCommandVars")
        onCommandFixSpy = spy.on(mockCommandImplementor, "onCommandFix")
        onCommandSciSpy = spy.on(mockCommandImplementor, "onCommandSci")
        onCommandRealSpy = spy.on(mockCommandImplementor, "onCommandReal")
        onCommandProgSpy = spy.on(mockCommandImplementor, "onCommandProg")
        cmdExec = new CommandExecutor(mockCommandImplementor)
    });

    it("should parse the EXIT command and call CommandImplementor.onCommandExit", () => {
        expect(cmdExec.parse("exit")).equal(true)
        expect(onCommandExitSpy).to.have.been.called()
    })

    it("should parse the QUIT command and call CommandImplementor.onCommandExit", () => {
        expect(cmdExec.parse("quit")).equal(true)
        expect(onCommandExitSpy).to.have.been.called()
    })

    it("should parse the VARS command and call CommandImplementor.onCommandVars", () => {
        expect(cmdExec.parse("vars")).equal(true)
        expect(onCommandVarsSpy).to.have.been.called()
    })

    it("should parse the FIX command and call CommandImplementor.onCommandFix", () => {
        expect(cmdExec.parse("fix")).equal(true)
        expect(onCommandFixSpy).to.have.been.called.with(2)
    })

    it("should parse the FIX with precision command and call CommandImplementor.onCommandFix", () => {
        expect(cmdExec.parse("fix 5")).equal(true)
        expect(onCommandFixSpy).to.have.been.called.with(5)
    })

    it("should throw an error for a badly formed FIX command", () => {
        expect(() => {cmdExec.parse("fix abcd")}).to.throw("syntax error in command")
    })

    it("should parse the SCI command and call CommandImplementor.onCommandSci", () => {
        expect(cmdExec.parse("sci")).equal(true)
        expect(onCommandSciSpy).to.have.been.called.with(2)
    })

    it("should parse the SCI with precision command and call CommandImplementor.onCommandSci", () => {
        expect(cmdExec.parse("sci 5")).equal(true)
        expect(onCommandSciSpy).to.have.been.called.with(5)
    })

    it("should throw an error for a badly formed SCI command", () => {
        expect(() => {cmdExec.parse("sci abcd")}).to.throw("syntax error in command")
    })

    it("should parse the REAL command and call CommandImplementor.onCommandReal", () => {
        expect(cmdExec.parse("real")).equal(true)
        expect(onCommandRealSpy).to.have.been.called()
    })

    it("should throw an error for a badly formed REAL command", () => {
        expect(() => {cmdExec.parse("real abcd")}).to.throw("syntax error in command")
    })

    it("should parse the PROG command and call CommandImplementor.onCommandProg", () => {
        expect(cmdExec.parse("prog")).equal(true)
        expect(onCommandProgSpy).to.have.been.called.with(32)
    })

    it("should parse the PROG with bits command and call CommandImplementor.onCommandProg", () => {
        expect(cmdExec.parse("prog 8")).equal(true)
        expect(onCommandProgSpy).to.have.been.called.with(8)
    })

    it("should throw an error for a badly formed PROG command", () => {
        expect(() => {cmdExec.parse("prog abcd")}).to.throw("syntax error in command")
    })

    it("should throw an error for a illegal bit sized in PROG command", () => {
        expect(() => {cmdExec.parse("prog 7")}).to.throw("invalid bit size")
    })

    xit("should detect unknown commands and throw an error", () => {
        expect(() => {cmdExec.parse("@ABADCOMMAND")}).to.throw("unknown command \"@ABADCOMMAND\"")
    })

})
