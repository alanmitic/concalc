import { expect } from 'chai'
import {TokenType} from './LexAn'
import {LexAn} from  './LexAn'

describe('Lexical Analayser API', function() {
  it('should return END on an empty expresstion string', function() {
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

  it('should extract indentifiers from a string', function() {
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
})