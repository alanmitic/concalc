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
        MockCommandImplementor.prototype.onCommandVars = function () { };
        MockCommandImplementor.prototype.onCommandExit = function () { };
        MockCommandImplementor.prototype.onCommandFix = function (precision) { };
        return MockCommandImplementor;
    }());
    var onCommandExitSpy;
    var onCommandVarsSpy;
    var onCommandFixSpy;
    var cmdExec;
    beforeEach(function () {
        chai_1.use(chai_spies_1.default);
        var mockCommandImplementor = new MockCommandImplementor();
        onCommandVarsSpy = chai_1.spy.on(mockCommandImplementor, "onCommandVars");
        onCommandExitSpy = chai_1.spy.on(mockCommandImplementor, "onCommandExit");
        onCommandFixSpy = chai_1.spy.on(mockCommandImplementor, "onCommandFix");
        cmdExec = new CommandExecutor_1.CommandExecutor(mockCommandImplementor);
    });
    it("should parse the exit command and call CommandImplementor.onCommandExit", function () {
        chai_1.expect(cmdExec.parse("exit")).equal(true);
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    it("should parse the quit command and call CommandImplementor.onCommandExit", function () {
        chai_1.expect(cmdExec.parse("quit")).equal(true);
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    it("should parse the vars command and call CommandImplementor.onCommandVars", function () {
        chai_1.expect(cmdExec.parse("vars")).equal(true);
        chai_1.expect(onCommandVarsSpy).to.have.been.called();
    });
    it("should parse the fix command and call CommandImplementor.onCommandFix", function () {
        chai_1.expect(cmdExec.parse("fix")).equal(true);
        chai_1.expect(onCommandFixSpy).to.have.been.called.with(2);
    });
    it("should parse the fix with precision command and call CommandImplementor.onCommandFix", function () {
        chai_1.expect(cmdExec.parse("fix 5")).equal(true);
        chai_1.expect(onCommandFixSpy).to.have.been.called.with(5);
    });
    it("should throw an error for a badly formed fix command", function () {
        chai_1.expect(function () { cmdExec.parse("fix abcd"); }).to.throw("syntax error in command");
    });
    xit("should detect unknown commands and throw an error", function () {
        chai_1.expect(function () { cmdExec.parse("@ABADCOMMAND"); }).to.throw("unknown command \"@ABADCOMMAND\"");
    });
});
//# sourceMappingURL=CommandExecutor.test.js.map