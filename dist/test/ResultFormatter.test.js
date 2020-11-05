"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ResultFormatter_1 = require("../ResultFormatter");
describe("Result Formatter API", function () {
    it("should output by default in GENERAL/DECIMAL mode.", function () {
        var rf = new ResultFormatter_1.ResultFormatter();
        chai_1.expect(rf.format(1)).equal("1");
    });
    it("should output in scientific mode.", function () {
        var rf = new ResultFormatter_1.ResultFormatter();
        rf.setMode(ResultFormatter_1.ResultMode.SCIENTIFIC);
        rf.setPrecision(2);
        chai_1.expect(rf.format(9.87654321)).equal("9.88e+0");
        rf.setPrecision(4);
        chai_1.expect(rf.format(9.87654321)).equal("9.8765e+0");
        rf.setPrecision(4);
        chai_1.expect(rf.format(0.0000123456789)).equal("1.2346e-5");
    });
    it("should output in fixed mode.", function () {
        var rf = new ResultFormatter_1.ResultFormatter();
        rf.setMode(ResultFormatter_1.ResultMode.FIXED);
        rf.setPrecision(2);
        chai_1.expect(rf.format(9.87654321)).equal("9.88");
        rf.setPrecision(4);
        chai_1.expect(rf.format(9.87654321)).equal("9.8765");
        rf.setPrecision(6);
        chai_1.expect(rf.format(0.0000123456789)).equal("0.000012");
    });
    it("should output in general mode.", function () {
        var rf = new ResultFormatter_1.ResultFormatter();
        rf.setMode(ResultFormatter_1.ResultMode.GENERAL);
        chai_1.expect(rf.format(9.87654321)).equal("9.87654321");
        chai_1.expect(rf.format(1234567890)).equal("1234567890");
        chai_1.expect(rf.format(0.0000123456789)).equal("0.0000123456789");
    });
});
//# sourceMappingURL=ResultFormatter.test.js.map