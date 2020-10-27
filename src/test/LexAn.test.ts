import { expect } from "chai"
import { TokenType, Token, LexAn, LexAnError } from "../LexAn"

describe("Lexical Analayser API", function () {
  it("should return END on an empty expression", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.END)
    expect(token[1]).equal(null)

    lexAn = new LexAn("\t\t\t\t")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.END)
    expect(token[1]).equal(null)

    lexAn = new LexAn("    ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.END)
    expect(token[1]).equal(null)
  })

  it("should extract indentifiers from an expression", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("   \tabc   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.IDENTIFIER)
    expect(token[1]).equal("abc")

    lexAn = new LexAn("abc   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.IDENTIFIER)
    expect(token[1]).equal("abc")

    lexAn = new LexAn("   \tabc")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.IDENTIFIER)
    expect(token[1]).equal("abc")

    lexAn = new LexAn("abc")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.IDENTIFIER)
    expect(token[1]).equal("abc")

    lexAn = new LexAn("aBc")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.IDENTIFIER)
    expect(token[1]).equal("aBc")
  })

  it("should extract numbers from an expression", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("   \t1234   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(1234)

    lexAn = new LexAn("1234   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(1234)

    lexAn = new LexAn("   \t1234")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(1234)

    lexAn = new LexAn("1234")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(1234)
  })

  it("should extract operators from an expression", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("   \t = & ~ | ' / << - % * + ^ >> >>>    (  )  \t  # A comment")

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_ASSIGN)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_BITWISE_AND)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_BITWISE_NOT)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_BITWISE_OR)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_BITWISE_XOR)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_DIVIDE)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_LEFT_SHIFT)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_MINUS)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_MOD)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_MULTIPLY)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_PLUS)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_POWER)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_RIGHT_SHIFT)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_UNSIGNED_RIGHT_SHIFT)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.LP)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.RP)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.END)
    expect(token[1]).equal(null)
  })

  it("should handle expressions where there are no spaces inbetween tokens", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("1234^5678")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(1234)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.OP_POWER)
    expect(token[1]).equal(null)

    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.NUMBER)
    expect(token[1]).equal(5678)
  })

  it("should extract variable names from an expression and they should be in uppercase", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("   \t$myVar   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.VARIABLE)
    expect(token[1]).equal("$MYVAR")
  })

  it("should extract command names from an command string", function () {
    let lexAn
    let token: Token

    lexAn = new LexAn("   \t@mycommand   \t  ")
    token = lexAn.getNextToken()
    expect(token[0]).equal(TokenType.COMMAND)
    expect(token[1]).equal("@mycommand")
  })

  it("should detect incomplete shift operator tokens and throw an error", function () {
    expect(() => {new LexAn(">").getNextToken()}).to.throw("incomplete token expected >> or >>>")
    expect(() => {new LexAn("<").getNextToken()}).to.throw("incomplete token expected <<")
  })

  it("should detect unknown tokens and throw an error", function () {
    expect(() => {new LexAn("_").getNextToken()}).to.throw("Unknown token \"_\"")
  })
})

describe("Lexical Analayser helper methods", function () {
  it("should detect whitespaces characters correctly", function () {
    expect(LexAn.isWhitespace(" ")).equal(true)
    expect(LexAn.isWhitespace("\t")).equal(true)
    expect(LexAn.isWhitespace("a")).equal(false)
    expect(LexAn.isWhitespace("")).equal(false)
  })

  it("should detect alpha characters correctly", function () {
    expect(LexAn.isAlpha(" ")).equal(false)
    expect(LexAn.isAlpha("\t")).equal(false)
    expect(LexAn.isAlpha("")).equal(false)
    expect(LexAn.isAlpha("a")).equal(true)
    expect(LexAn.isAlpha("z")).equal(true)
    expect(LexAn.isAlpha("A")).equal(true)
    expect(LexAn.isAlpha("Z")).equal(true)
  })

  it("should detect numbers characters correctly", function () {
    expect(LexAn.isNumber(" ")).equal(false)
    expect(LexAn.isNumber("\t")).equal(false)
    expect(LexAn.isNumber("")).equal(false)
    expect(LexAn.isNumber("a")).equal(false)
    expect(LexAn.isNumber("z")).equal(false)
    expect(LexAn.isNumber("0")).equal(true)
    expect(LexAn.isNumber("9")).equal(true)
  })

})