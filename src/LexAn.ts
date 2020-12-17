/**
 * Lexical Analyser.
 */

/**
 * TokenType indicating what the extracted text represents.
 */
export enum TokenType {
    /** End of input has been reached. */
    END,
    /** Variable name "$name". */
    VARIABLE,
    /** Left parentheses "(". */
    LP,
    /** Right parentheses ")". */
    RP,
    /** Identifier. */
    IDENTIFIER,
    /** Number. */
    NUMBER,
    /** Assign operator "=". */
    OP_ASSIGN,
    /** Bitwise and operator "&". */
    OP_BITWISE_AND,
    /** Bitwise not operator "~". */
    OP_BITWISE_NOT,
    /** Bitwise or operator "|". */
    OP_BITWISE_OR,
    /** Bitwise exclusive or operator "'". */
    OP_BITWISE_XOR,
    /** Divide operator "/". */
    OP_DIVIDE,
    /** Left shift operator "<<". */
    OP_LEFT_SHIFT,
    /** Minus operator "-". */
    OP_MINUS,
    /** Modulo operator "%". */
    OP_MOD,
    /** Multiply operator "*". */
    OP_MULTIPLY,
    /** Plus operator "+". */
    OP_PLUS,
    /** Power operator "^". */
    OP_POWER,
    /** Right shift operator ">>". */
    OP_RIGHT_SHIFT,
    /** Unsigned right shift operator ">>>". */
    OP_UNSIGNED_RIGHT_SHIFT
}

export class LexAnError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "LexAnError"
    }
}

/**
 * Token is a tuple that consists of a token type and value associated with that type.
 */
export type Token = [TokenType, number | string | null]

/**
 * Lexical Analyser
 */
export class LexAn {
    /** Input text being analysed. */
    inputText: string
    /** Current index into the input text. */
    inputIndex: number
    /** Current token or null if there is not token. */
    currentToken: Token | null

    /**
     * Constructor.
     * @param inputText Input text to tokenize.
     */
    constructor(inputText: string) {
        this.inputText = inputText
        this.inputIndex = 0
        this.currentToken = null
    }

    /**
     * Gets the current token or null if there is no current token defined.
     */
    getCurrentToken(): Token | null {
        return this.currentToken
    }

    /**
     * Gets the next token from the input text.
     */
    getNextToken(): Token {
        this.skipSpaces()

        if (this.inputIndex > this.inputText.length - 1) {
            return [TokenType.END, null]
        }

        let nextToken: Token

        let ch: string = this.inputText.charAt(this.inputIndex)
        switch (ch) {
            case "#":
                nextToken = [TokenType.END, null]
                break

            case "(":
                nextToken = [TokenType.LP, null]
                this.inputIndex++
                break

            case ")":
                nextToken = [TokenType.RP, null]
                this.inputIndex++
                break

            case "=":
                nextToken = [TokenType.OP_ASSIGN, null]
                this.inputIndex++
                break

            case "&":
                nextToken = [TokenType.OP_BITWISE_AND, null]
                this.inputIndex++
                break

            case "~":
                nextToken = [TokenType.OP_BITWISE_NOT, null]
                this.inputIndex++
                break

            case "|":
                nextToken = [TokenType.OP_BITWISE_OR, null]
                this.inputIndex++
                break

            case "'":
                nextToken = [TokenType.OP_BITWISE_XOR, null]
                this.inputIndex++
                break

            case "/":
                nextToken = [TokenType.OP_DIVIDE, null]
                this.inputIndex++
                break

            case "<":
                // Check for "<<"
                if (this.peekNextChar() === "<") {
                    this.inputIndex++
                    nextToken = [TokenType.OP_LEFT_SHIFT, null]
                } else {
                    throw new LexAnError("incomplete token expected <<")
                }
                this.inputIndex++
                break

            case "-":
                nextToken = [TokenType.OP_MINUS, null]
                this.inputIndex++
                break

            case "%":
                nextToken = [TokenType.OP_MOD, null]
                this.inputIndex++
                break

            case "*":
                nextToken = [TokenType.OP_MULTIPLY, null]
                this.inputIndex++
                break

            case "+":
                nextToken = [TokenType.OP_PLUS, null]
                this.inputIndex++
                break

            case "^":
                nextToken = [TokenType.OP_POWER, null]
                this.inputIndex++
                break

            case ">":
                // Need to check for ">>" or ">>>"
                if (this.peekNextChar() === ">") {
                    this.inputIndex++
                    if (this.peekNextChar() === ">") {
                        this.inputIndex++
                        nextToken = [TokenType.OP_UNSIGNED_RIGHT_SHIFT, null]
                    } else {
                        nextToken = [TokenType.OP_RIGHT_SHIFT, null]
                    }
                } else {
                    throw new LexAnError("incomplete token expected >> or >>>")
                }
                this.inputIndex++
                break

            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case ".":
                    nextToken = [TokenType.NUMBER, this.extractNumber()]
                break

            case "$":
                this.inputIndex++
                nextToken = [TokenType.VARIABLE, "$" + this.extractIdentifier().toLocaleUpperCase()]
                break

            default:
                // Error
                if (LexAn.isAlpha(ch)) {
                    nextToken = [TokenType.IDENTIFIER, this.extractIdentifier()]
                } else {
                    throw new LexAnError("Unknown token \"" + ch + "\"")
                }
        }

        this.currentToken = nextToken
        return nextToken
    }

    peekNextToken(): Token {
        // Save the current state.
        let oldCurrentToken = this.currentToken
        let oldInputIndex = this.inputIndex

        // Extract the next token.
        let nextToken = this.getNextToken()

        // Restore the old state.
        this.inputIndex = oldInputIndex
        this.currentToken = oldCurrentToken

        return nextToken
    }

    /**
     * Peek at the next character without incrementing current position.
     */
    private peekNextChar(): string {
        let ch: string = this.inputText.charAt(this.inputIndex + 1)
        return ch
    }

    /**
     * Skips the leading spaces from the input text starting at the current
     * processing position.
     */
    private skipSpaces() {
        while(LexAn.isWhitespace(this.inputText.charAt(this.inputIndex))) {
            this.inputIndex++
        }
    }

    /**
     * Extracts the number from the current processing position in the input text.
     */
    public extractNumber(): number {
        let extractedNumber: number = 0
        let extractedNumberString: string = ""
        let exponentDetected: boolean = false
        let decimalPointDetected: boolean = false

        for (; ;) {
            let ch: string = this.inputText.charAt(this.inputIndex)
            // Note: an empty string is returned in ch if the index goes out of bounds.

            if (LexAn.isNumber(ch)) {
                extractedNumberString = extractedNumberString + ch
                this.inputIndex++
            } else if (!exponentDetected && !decimalPointDetected && ch === '.') {
                extractedNumberString = extractedNumberString + ch
                this.inputIndex++
                decimalPointDetected = true
            } else if (!exponentDetected && (ch === 'e' || ch === 'E')) {
                extractedNumberString = extractedNumberString + ch
                this.inputIndex++
                exponentDetected = true
            } else if (exponentDetected && (ch === '+' || ch === '-')) {
                extractedNumberString = extractedNumberString + ch
                this.inputIndex++
            } else {
                break
            }
        }

        return extractedNumber = parseFloat(extractedNumberString)
    }

    /**
     * Extracts the identifier from the current processing position in the input text.
     */
    private extractIdentifier(): string {

        let extractedIdentifier = ""
        let firstCharProcessed = false

        for (; ;) {
            let ch: string = this.inputText.charAt(this.inputIndex)
            // Note: an empty string is returned in ch if the index goes out of bounds.
            let isAlpha = LexAn.isAlpha(ch)
            let isNum = LexAn.isNumber(ch)
            let isIdentiferChar =  (!firstCharProcessed && isAlpha) || (firstCharProcessed && (isAlpha || isNum))

            if (isIdentiferChar) {
                extractedIdentifier = extractedIdentifier + ch
                this.inputIndex++
                firstCharProcessed = true
            } else {
                break
            }
        }

        return extractedIdentifier
    }

    /**
     * Determines if the supplied character string is a whitespace character.
     * @param ch Character to test.
     */
    static isWhitespace(ch: string): boolean {
        return ch.match(/^\s+$/) !== null
    }

    /**
     * Determines if the supplied character string is an alpha character.
     * @param ch Character to test.
     */
    static isAlpha(ch: string): boolean {
        return ch.match(/^[a-z]+$/i) !== null
    }

    /**
     * Determines if the supplied character string is an alpha character.
     * @param ch Character to test.
     */
    static isNumber(ch: string): boolean {
        return ch.match(/^[0-9]+$/) !== null
    }

}
