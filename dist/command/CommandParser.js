"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandError = void 0;
var CommandError = /** @class */ (function (_super) {
    __extends(CommandError, _super);
    function CommandError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "CommandError";
        return _this;
    }
    return CommandError;
}(Error));
exports.CommandError = CommandError;
//# sourceMappingURL=CommandParser.js.map