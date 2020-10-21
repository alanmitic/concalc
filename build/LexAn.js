"use strict";
/**
 * Lexical Analyser.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexAn = exports.LexAnException = exports.TokenType = void 0;
/**
 * TokenType indicating what the extracted text represents.
 */
var TokenType;
(function (TokenType) {
    /** End of input has been reached. */
    TokenType[TokenType["END"] = 0] = "END";
    /** Variable name "$name". */
    TokenType[TokenType["VARIABLE"] = 1] = "VARIABLE";
    /** Left parentheses "(". */
    TokenType[TokenType["LP"] = 2] = "LP";
    /** Right parentheses ")". */
    TokenType[TokenType["RP"] = 3] = "RP";
    /** Identifier. */
    TokenType[TokenType["IDENTIFIER"] = 4] = "IDENTIFIER";
    /** Number. */
    TokenType[TokenType["NUMBER"] = 5] = "NUMBER";
    /** Assign operator "=". */
    TokenType[TokenType["OP_ASSIGN"] = 6] = "OP_ASSIGN";
    /** Bitwise and operator "&". */
    TokenType[TokenType["OP_BITWISE_AND"] = 7] = "OP_BITWISE_AND";
    /** Bitwise not operator "!". */
    TokenType[TokenType["OP_BITWISE_NOT"] = 8] = "OP_BITWISE_NOT";
    /** Bitwise or operator "|" or "?". */
    TokenType[TokenType["OP_BITWISE_OR"] = 9] = "OP_BITWISE_OR";
    /** Bitwise exclusive or operator "'". */
    TokenType[TokenType["OP_BITWISE_XOR"] = 10] = "OP_BITWISE_XOR";
    /** Divide operator "/". */
    TokenType[TokenType["OP_DIVIDE"] = 11] = "OP_DIVIDE";
    /** Left shift operator "<<". */
    TokenType[TokenType["OP_LEFT_SHIFT"] = 12] = "OP_LEFT_SHIFT";
    /** Minus operator "-". */
    TokenType[TokenType["OP_MINUS"] = 13] = "OP_MINUS";
    /** Modulo operator "%". */
    TokenType[TokenType["OP_MOD"] = 14] = "OP_MOD";
    /** Multiply operator "*". */
    TokenType[TokenType["OP_MULTIPLY"] = 15] = "OP_MULTIPLY";
    /** Plus operator "+". */
    TokenType[TokenType["OP_PLUS"] = 16] = "OP_PLUS";
    /** Power operator "^". */
    TokenType[TokenType["OP_POWER"] = 17] = "OP_POWER";
    /** Right shift operator ">>". */
    TokenType[TokenType["OP_RIGHT_SHIFT"] = 18] = "OP_RIGHT_SHIFT";
    /** Unsigned right shift operator ">>>". */
    TokenType[TokenType["OP_UNSIGNED_RIGHT_SHIFT"] = 19] = "OP_UNSIGNED_RIGHT_SHIFT";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var LexAnException = /** @class */ (function () {
    function LexAnException() {
    }
    return LexAnException;
}());
exports.LexAnException = LexAnException;
/**
 * Lexical Analyser
 */
var LexAn = /** @class */ (function () {
    /**
     * Constructor.
     * @param inputText Input text to tokensize.
     */
    function LexAn(inputText) {
        this.inputText = inputText;
        this.inputIndex = -1;
    }
    /**
     * Gets the next token from the input text.
     */
    LexAn.prototype.getNextToken = function () {
        this.skipSpaces();
        // Go to the next position in the input text and check if we have reached the end of the input.
        if (++this.inputIndex > this.inputText.length - 1) {
            return [TokenType.END, null];
        }
        var nextToken;
        var ch = this.inputText.charAt(this.inputIndex);
        switch (ch) {
            case "#": // A comment
                nextToken = [TokenType.END, null];
                break;
            default:
                // Error
                if (LexAn.isAlpha(ch)) {
                    nextToken = [TokenType.IDENTIFIER, this.extractIdentifier()];
                }
                else {
                    throw new LexAnException();
                }
        }
        return nextToken;
    };
    /**
     * Skips the leading spaces from the input text starting at the current
     * processing position.
     */
    LexAn.prototype.skipSpaces = function () {
        do {
            this.inputIndex++;
        } while (this.inputIndex <= this.inputText.length &&
            LexAn.isWhitespace(this.inputText.charAt(this.inputIndex)));
        this.inputIndex--;
    };
    /**
     * Extracts the indentifier from the current pocessing position in the input text.
     */
    LexAn.prototype.extractIdentifier = function () {
        var extractedIdentifier = "";
        for (;;) {
            var ch = this.inputText.charAt(this.inputIndex++);
            // Note: an empty string is returned in ch if the index goes out of bounds.
            if (LexAn.isAlpha(ch)) {
                extractedIdentifier = extractedIdentifier + ch;
            }
            else {
                this.inputIndex--;
                break;
            }
        }
        return extractedIdentifier;
    };
    /**
     * Determines if the supplied character string is a whitespace character.
     * @param ch Character to test.
     */
    LexAn.isWhitespace = function (ch) {
        return ch.match(/^\s+$/) !== null;
    };
    /**
     * Determines if the supplied character string is an alpha character.
     * @param ch Character to test.
     */
    LexAn.isAlpha = function (ch) {
        return ch.match(/^[a-z0-9]+$/i) !== null;
    };
    return LexAn;
}());
exports.LexAn = LexAn;
//# sourceMappingURL=LexAn.js.map