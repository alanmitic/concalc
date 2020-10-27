"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var LexAn_1 = require("../LexAn");
describe("Lexical Analayser API", function () {
    it("should return END on an empty expression", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
        lexAn = new LexAn_1.LexAn("\t\t\t\t");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
        lexAn = new LexAn_1.LexAn("    ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
    });
    it("should extract indentifiers from an expression", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("   \tabc   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_1.LexAn("abc   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_1.LexAn("   \tabc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_1.LexAn("abc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("abc");
        lexAn = new LexAn_1.LexAn("aBc");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.IDENTIFIER);
        chai_1.expect(token[1]).equal("aBc");
    });
    it("should extract numbers from an expression", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("   \t1234   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_1.LexAn("1234   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_1.LexAn("   \t1234");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        lexAn = new LexAn_1.LexAn("1234");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
    });
    it("should extract operators from an expression", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("   \t = & ~ | ' / << - % * + ^ >> >>>    (  )  \t  # A comment");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_ASSIGN);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_BITWISE_AND);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_BITWISE_NOT);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_BITWISE_OR);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_BITWISE_XOR);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_DIVIDE);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_LEFT_SHIFT);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_MINUS);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_MOD);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_MULTIPLY);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_PLUS);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_POWER);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_RIGHT_SHIFT);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_UNSIGNED_RIGHT_SHIFT);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.LP);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.RP);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.END);
        chai_1.expect(token[1]).equal(null);
    });
    it("should handle expressions where there are no spaces inbetween tokens", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("1234^5678");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(1234);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.OP_POWER);
        chai_1.expect(token[1]).equal(null);
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.NUMBER);
        chai_1.expect(token[1]).equal(5678);
    });
    it("should extract variable names from an expression and they should be in uppercase", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("   \t$myVar   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.VARIABLE);
        chai_1.expect(token[1]).equal("$MYVAR");
    });
    it("should extract command names from an command string", function () {
        var lexAn;
        var token;
        lexAn = new LexAn_1.LexAn("   \t@mycommand   \t  ");
        token = lexAn.getNextToken();
        chai_1.expect(token[0]).equal(LexAn_1.TokenType.COMMAND);
        chai_1.expect(token[1]).equal("@mycommand");
    });
});
describe("Lexical Analayser helper methods", function () {
    it("should detect whitespaces characters correctly", function () {
        chai_1.expect(LexAn_1.LexAn.isWhitespace(" ")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isWhitespace("\t")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isWhitespace("a")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isWhitespace("")).equal(false);
    });
    it("should detect alpha characters correctly", function () {
        chai_1.expect(LexAn_1.LexAn.isAlpha(" ")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isAlpha("\t")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isAlpha("")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isAlpha("a")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isAlpha("z")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isAlpha("A")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isAlpha("Z")).equal(true);
    });
    it("should detect numbers characters correctly", function () {
        chai_1.expect(LexAn_1.LexAn.isNumber(" ")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isNumber("\t")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isNumber("")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isNumber("a")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isNumber("z")).equal(false);
        chai_1.expect(LexAn_1.LexAn.isNumber("0")).equal(true);
        chai_1.expect(LexAn_1.LexAn.isNumber("9")).equal(true);
    });
});
//# sourceMappingURL=LexAn.test.js.map