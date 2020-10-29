"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ResultFormatter_1 = require("../ResultFormatter");
describe("Result Formatter API", function () {
    it("should output bt default in GENERAL/DECIMAL mode.", function () {
        var rf = new ResultFormatter_1.ResultFormatter();
        chai_1.expect(rf.format(1)).equal("1");
    });
});
//# sourceMappingURL=ResultFormatter.test.js.map