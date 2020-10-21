import { expect } from 'chai'
import {TokenType} from './LexAn'
import {LexAn} from  './LexAn'

describe('Lexical Analayser API', function() {
  it('should return END on an empty expression', function() {
    let lexAn
    let token: [TokenType, string | number | null]

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

  it('should extract indentifiers from an expression', function() {
    let lexAn
    let token: [TokenType, string | number | null]

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

  it('should extract numbers from an expression', function() {
    let lexAn
    let token: [TokenType, string | number | null]

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
})

describe('Lexical Analayser helper methods', function() {
  it('should detect whitespaces characters correctly', function() {
    expect(LexAn.isWhitespace(" ")).equal(true);
    expect(LexAn.isWhitespace("\t")).equal(true);
    expect(LexAn.isWhitespace("a")).equal(false);
    expect(LexAn.isWhitespace("")).equal(false);
  })

  it('should detect alpha characters correctly', function() {
    expect(LexAn.isAlpha(" ")).equal(false);
    expect(LexAn.isAlpha("\t")).equal(false);
    expect(LexAn.isAlpha("")).equal(false);
    expect(LexAn.isAlpha("a")).equal(true);
    expect(LexAn.isAlpha("z")).equal(true);
    expect(LexAn.isAlpha("A")).equal(true);
    expect(LexAn.isAlpha("Z")).equal(true);
  })

  it('should detect numbers characters correctly', function() {
    expect(LexAn.isNumber(" ")).equal(false);
    expect(LexAn.isNumber("\t")).equal(false);
    expect(LexAn.isNumber("")).equal(false);
    expect(LexAn.isNumber("a")).equal(false);
    expect(LexAn.isNumber("z")).equal(false);
    expect(LexAn.isNumber("0")).equal(true);
    expect(LexAn.isNumber("9")).equal(true);
  })

})