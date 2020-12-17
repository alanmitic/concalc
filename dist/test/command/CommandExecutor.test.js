"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai_spies_1 = __importDefault(require("chai-spies"));
var CommandExecutor_1 = require("../../command/CommandExecutor");
describe("Command Parser API", function () {
    var MockCommandImplementor = /** @class */ (function () {
        function MockCommandImplementor() {
        }
        MockCommandImplementor.prototype.onCommandExit = function () { };
        MockCommandImplementor.prototype.onCommandVars = function () { };
        MockCommandImplementor.prototype.onCommandFix = function (precision) { };
        MockCommandImplementor.prototype.onCommandSci = function (precision) { };
        MockCommandImplementor.prototype.onCommandReal = function () { };
        MockCommandImplementor.prototype.onCommandProg = function (bits) { };
        return MockCommandImplementor;
    }());
    var onCommandExitSpy;
    var onCommandVarsSpy;
    var onCommandFixSpy;
    var onCommandSciSpy;
    var onCommandRealSpy;
    var onCommandProgSpy;
    var cmdExec;
    beforeEach(function () {
        chai_1.use(chai_spies_1.default);
        var mockCommandImplementor = new MockCommandImplementor();
        onCommandExitSpy = chai_1.spy.on(mockCommandImplementor, "onCommandExit");
        onCommandVarsSpy = chai_1.spy.on(mockCommandImplementor, "onCommandVars");
        onCommandFixSpy = chai_1.spy.on(mockCommandImplementor, "onCommandFix");
        onCommandSciSpy = chai_1.spy.on(mockCommandImplementor, "onCommandSci");
        onCommandRealSpy = chai_1.spy.on(mockCommandImplementor, "onCommandReal");
        onCommandProgSpy = chai_1.spy.on(mockCommandImplementor, "onCommandProg");
        cmdExec = new CommandExecutor_1.CommandExecutor(mockCommandImplementor);
    });
    it("should parse the EXIT command and call CommandImplementor.onCommandExit", function () {
        chai_1.expect(cmdExec.parse("exit")).equal(true);
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    it("should parse the QUIT command and call CommandImplementor.onCommandExit", function () {
        chai_1.expect(cmdExec.parse("quit")).equal(true);
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    it("should parse the VARS command and call CommandImplementor.onCommandVars", function () {
        chai_1.expect(cmdExec.parse("vars")).equal(true);
        chai_1.expect(onCommandVarsSpy).to.have.been.called();
    });
    it("should parse the FIX command and call CommandImplementor.onCommandFix", function () {
        chai_1.expect(cmdExec.parse("fix")).equal(true);
        chai_1.expect(onCommandFixSpy).to.have.been.called.with(2);
    });
    it("should parse the FIX with precision command and call CommandImplementor.onCommandFix", function () {
        chai_1.expect(cmdExec.parse("fix 5")).equal(true);
        chai_1.expect(onCommandFixSpy).to.have.been.called.with(5);
    });
    it("should throw an error for a badly formed FIX command", function () {
        chai_1.expect(function () { cmdExec.parse("fix abcd"); }).to.throw("syntax error in command");
    });
    it("should parse the SCI command and call CommandImplementor.onCommandSci", function () {
        chai_1.expect(cmdExec.parse("sci")).equal(true);
        chai_1.expect(onCommandSciSpy).to.have.been.called.with(2);
    });
    it("should parse the SCI with precision command and call CommandImplementor.onCommandSci", function () {
        chai_1.expect(cmdExec.parse("sci 5")).equal(true);
        chai_1.expect(onCommandSciSpy).to.have.been.called.with(5);
    });
    it("should throw an error for a badly formed SCI command", function () {
        chai_1.expect(function () { cmdExec.parse("sci abcd"); }).to.throw("syntax error in command");
    });
    it("should parse the REAL command and call CommandImplementor.onCommandReal", function () {
        chai_1.expect(cmdExec.parse("real")).equal(true);
        chai_1.expect(onCommandRealSpy).to.have.been.called();
    });
    it("should throw an error for a badly formed REAL command", function () {
        chai_1.expect(function () { cmdExec.parse("real abcd"); }).to.throw("syntax error in command");
    });
    it("should parse the PROG command and call CommandImplementor.onCommandProg", function () {
        chai_1.expect(cmdExec.parse("prog")).equal(true);
        chai_1.expect(onCommandProgSpy).to.have.been.called.with(32);
    });
    it("should parse the PROG with bits command and call CommandImplementor.onCommandProg", function () {
        chai_1.expect(cmdExec.parse("prog 8")).equal(true);
        chai_1.expect(onCommandProgSpy).to.have.been.called.with(8);
    });
    it("should throw an error for a badly formed PROG command", function () {
        chai_1.expect(function () { cmdExec.parse("prog abcd"); }).to.throw("syntax error in command");
    });
    it("should throw an error for a illegal bit sized in PROG command", function () {
        chai_1.expect(function () { cmdExec.parse("prog 7"); }).to.throw("invalid bit size");
    });
    xit("should detect unknown commands and throw an error", function () {
        chai_1.expect(function () { cmdExec.parse("@ABADCOMMAND"); }).to.throw("unknown command \"@ABADCOMMAND\"");
    });
});
//# sourceMappingURL=CommandExecutor.test.js.map