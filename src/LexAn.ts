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
    /** Bitwise or operator "|" or "?". */
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

export class LexAnException {

}

/**
 * Lexical Analyser
 */
export class LexAn {
    /** Input text being analysed. */
    inputText: string
    /** Current index into the input text. */
    inputIndex: number

    /**
     * Constructor.
     * @param inputText Input text to tokensize.
     */
    constructor(inputText: string) {
        this.inputText = inputText
        this.inputIndex = -1
    }

    /**
     * Gets the next token from the input text.
     */
    getNextToken(): [TokenType, number | string | null] {
        this.skipSpaces()

        // Go to the next position in the input text and check if we have reached the end of the input.
        if (++this.inputIndex > this.inputText.length - 1) {
            return [TokenType.END, null]
        }

        let nextToken: [TokenType, number | string | null]

        let ch: string = this.inputText.charAt(this.inputIndex)
        switch (ch) {
            case "#": // A comment
                nextToken = [TokenType.END, null];
                break

            case "(":
                nextToken = [TokenType.LP, null];
                break;

            case ")":
                nextToken = [TokenType.RP, null];
                break;

            case "=":
                nextToken = [TokenType.OP_ASSIGN, null];
                break

            case "&":
                nextToken = [TokenType.OP_BITWISE_AND, null];
                break

            case "~":
                nextToken = [TokenType.OP_BITWISE_NOT, null];
                break

            case "|":
                nextToken = [TokenType.OP_BITWISE_OR, null];
                break

            case "'":
                nextToken = [TokenType.OP_BITWISE_XOR, null];
                break

            case "/":
                nextToken = [TokenType.OP_DIVIDE, null];
                break

            case "<":
                // Check for "<<"
                if (this.peekNextChar() === "<") {
                    this.inputIndex++;
                    nextToken = [TokenType.OP_LEFT_SHIFT, null];
                } else {
                    throw new LexAnException();
                }
                break

            case "-":
                nextToken = [TokenType.OP_MINUS, null];
                break

            case "%":
                nextToken = [TokenType.OP_MOD, null];
                break

            case "*":
                nextToken = [TokenType.OP_MULTIPLY, null];
                break

            case "+":
                nextToken = [TokenType.OP_PLUS, null];
                break

            case "^":
                nextToken = [TokenType.OP_POWER, null];
                break

            case ">":
                // Need to check for ">>" or ">>>"
                if (this.peekNextChar() === ">") {
                    this.inputIndex++;
                    if (this.peekNextChar() === ">") {
                        this.inputIndex++;
                        nextToken = [TokenType.OP_UNSIGNED_RIGHT_SHIFT, null];
                    } else {
                        nextToken = [TokenType.OP_RIGHT_SHIFT, null];
                    }
                } else {
                    throw new LexAnException();
                }
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
                nextToken = [TokenType.NUMBER, this.extractNumber()];
                break

            case "$":
                nextToken = [TokenType.VARIABLE, "myvar"];
                break

            default:
                // Error
                if (LexAn.isAlpha(ch)) {
                    nextToken = [TokenType.IDENTIFIER, this.extractIdentifier()]
                } else {
                    throw new LexAnException();
                }
        }

        return nextToken
    }

    /**
     * Peek at the next character without incrementing current position.
     */
    private peekNextChar(): string {
        let ch: string = this.inputText.charAt(this.inputIndex+1)
        return ch
    }

    /**
     * Skips the leading spaces from the input text starting at the current
     * processing position.
     */
    private skipSpaces() {
        do {
            this.inputIndex++
        } while (this.inputIndex <= this.inputText.length &&
            LexAn.isWhitespace(this.inputText.charAt(this.inputIndex)))

        this.inputIndex--;
    }

    /**
     * Extracts the number from the current pocessing position in the input text.
     */
    public extractNumber(): number {
        let extractedNumber: number = 0;
        let extractedNumberString: string = ""
        for(; ;) {
            let ch: string = this.inputText.charAt(this.inputIndex++)
            // Note: an empty string is returned in ch if the index goes out of bounds.

            if (LexAn.isNumber(ch)) {
                extractedNumberString = extractedNumberString + ch
            } else {
                this.inputIndex--
                break;
            }
        }

        return extractedNumber = parseInt(extractedNumberString);
    }

    /**
     * Extracts the indentifier from the current pocessing position in the input text.
     */
    private extractIdentifier(): string {

        let extractedIdentifier = ""

        for (; ;) {
            let ch: string = this.inputText.charAt(this.inputIndex++)
            // Note: an empty string is returned in ch if the index goes out of bounds.

            if (LexAn.isAlpha(ch)) {
                extractedIdentifier = extractedIdentifier + ch
            } else {
                this.inputIndex--
                break;
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
