"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var LexAn_1 = require("./LexAn");
var LexAn_2 = require("./LexAn");
describe('Lexical Analayser API', function () {
    it('should return END on an empty expression', function () {
        var lexAn;
        var token;
        lexAn = new LexAn_2.LexAn("");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
        lexAn = new LexAn_2.LexAn("\t\t\t\t");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
        lexAn = new LexAn_2.LexAn("    ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
    });
    it('should extract indentifiers from an expression', function () {
        var lexAn;
        var token;
        lexAn = new LexAn_2.LexAn("   \tabc   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_2.LexAn("abc   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_2.LexAn("   \tabc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_2.LexAn("abc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_2.LexAn("aBc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("aBc");
    });
    it('should extract numbers from an expression', function () {
        var lexAn;
        var token;
        lexAn = new LexAn_2.LexAn("   \t1234   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_2.LexAn("1234   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_2.LexAn("   \t1234");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_2.LexAn("1234");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
    });
});
describe('Lexical Analayser helper methods', function () {
    it('should detect whitespaces characters correctly', function () {
        chai_1.expect(LexAn_2.LexAn.isWhitespace(" ")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isWhitespace("\t")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isWhitespace("a")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isWhitespace("")).equal(false);
    });
    it('should detect alpha characters correctly', function () {
        chai_1.expect(LexAn_2.LexAn.isAlpha(" ")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isAlpha("\t")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isAlpha("")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isAlpha("a")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isAlpha("z")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isAlpha("A")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isAlpha("Z")).equal(true);
    });
    it('should detect numbers characters correctly', function () {
        chai_1.expect(LexAn_2.LexAn.isNumber(" ")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isNumber("\t")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isNumber("")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isNumber("a")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isNumber("z")).equal(false);
        chai_1.expect(LexAn_2.LexAn.isNumber("0")).equal(true);
        chai_1.expect(LexAn_2.LexAn.isNumber("9")).equal(true);
    });
});
//# sourceMappingURL=LexAn.test.js.map