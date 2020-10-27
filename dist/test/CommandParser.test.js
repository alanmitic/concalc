"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var chai_spies_1 = __importDefault(require("chai-spies"));
var CommandParser_1 = require("../CommandParser");
describe("Command Parser API", function () {
    var MockCommandImplementor = /** @class */ (function () {
        function MockCommandImplementor() {
        }
        MockCommandImplementor.prototype.onCommandExit = function () { };
        return MockCommandImplementor;
    }());
    var onCommandExitSpy;
    var cmdParser;
    beforeEach(function () {
        chai_1.use(chai_spies_1.default);
        var mockCommandImplementor = new MockCommandImplementor();
        onCommandExitSpy = chai_1.spy.on(mockCommandImplementor, 'onCommandExit');
        cmdParser = new CommandParser_1.CommandParser(mockCommandImplementor);
    });
    it("should parse the exit command and call CommandImplementor.onCommandExit", function () {
        cmdParser.parse("exit");
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    it("should parse the quit command and call CommandImplementor.onCommandExit", function () {
        cmdParser.parse("quit");
        chai_1.expect(onCommandExitSpy).to.have.been.called();
    });
    xit("should detect unknown commands and throw an error", function () {
        chai_1.expect(function () { cmdParser.parse("@ABADCOMMAND"); }).to.throw("unknown command \"@ABADCOMMAND\"");
    });
});
//# sourceMappingURL=CommandParser.test.js.map