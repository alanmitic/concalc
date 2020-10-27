"use strict";
/**
 * Lexical Analyser.
 */
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
exports.LexAn = exports.LexAnError = exports.TokenType = void 0;
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
    /** Bitwise not operator "~". */
    TokenType[TokenType["OP_BITWISE_NOT"] = 8] = "OP_BITWISE_NOT";
    /** Bitwise or operator "|". */
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
var LexAnError = /** @class */ (function (_super) {
    __extends(LexAnError, _super);
    function LexAnError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "LexAnError";
        return _this;
    }
    return LexAnError;
}(Error));
exports.LexAnError = LexAnError;
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
        this.inputIndex = 0;
        this.currentToken = null;
    }
    /**
     * Gets the curent token or null if there is no current token defined.
     */
    LexAn.prototype.getCurrentToken = function () {
        return this.currentToken;
    };
    /**
     * Gets the next token from the input text.
     */
    LexAn.prototype.getNextToken = function () {
        this.skipSpaces();
        if (this.inputIndex > this.inputText.length - 1) {
            return [TokenType.END, null];
        }
        var nextToken;
        var ch = this.inputText.charAt(this.inputIndex);
        switch (ch) {
            case "#":
                nextToken = [TokenType.END, null];
                break;
            case "(":
                nextToken = [TokenType.LP, null];
                this.inputIndex++;
                break;
            case ")":
                nextToken = [TokenType.RP, null];
                this.inputIndex++;
                break;
            case "=":
                nextToken = [TokenType.OP_ASSIGN, null];
                this.inputIndex++;
                break;
            case "&":
                nextToken = [TokenType.OP_BITWISE_AND, null];
                this.inputIndex++;
                break;
            case "~":
                nextToken = [TokenType.OP_BITWISE_NOT, null];
                this.inputIndex++;
                break;
            case "|":
                nextToken = [TokenType.OP_BITWISE_OR, null];
                this.inputIndex++;
                break;
            case "'":
                nextToken = [TokenType.OP_BITWISE_XOR, null];
                this.inputIndex++;
                break;
            case "/":
                nextToken = [TokenType.OP_DIVIDE, null];
                this.inputIndex++;
                break;
            case "<":
                // Check for "<<"
                if (this.peekNextChar() === "<") {
                    this.inputIndex++;
                    nextToken = [TokenType.OP_LEFT_SHIFT, null];
                }
                else {
                    throw new LexAnError("incomplete token expected <<");
                }
                this.inputIndex++;
                break;
            case "-":
                nextToken = [TokenType.OP_MINUS, null];
                this.inputIndex++;
                break;
            case "%":
                nextToken = [TokenType.OP_MOD, null];
                this.inputIndex++;
                break;
            case "*":
                nextToken = [TokenType.OP_MULTIPLY, null];
                this.inputIndex++;
                break;
            case "+":
                nextToken = [TokenType.OP_PLUS, null];
                this.inputIndex++;
                break;
            case "^":
                nextToken = [TokenType.OP_POWER, null];
                this.inputIndex++;
                break;
            case ">":
                // Need to check for ">>" or ">>>"
                if (this.peekNextChar() === ">") {
                    this.inputIndex++;
                    if (this.peekNextChar() === ">") {
                        this.inputIndex++;
                        nextToken = [TokenType.OP_UNSIGNED_RIGHT_SHIFT, null];
                    }
                    else {
                        nextToken = [TokenType.OP_RIGHT_SHIFT, null];
                    }
                }
                else {
                    throw new LexAnError("incomplete token expected >> or >>>");
                }
                this.inputIndex++;
                break;
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
                break;
            case "$":
                this.inputIndex++;
                nextToken = [TokenType.VARIABLE, "$" + this.extractIdentifier().toLocaleUpperCase()];
                break;
            default:
                // Error
                if (LexAn.isAlpha(ch)) {
                    nextToken = [TokenType.IDENTIFIER, this.extractIdentifier()];
                }
                else {
                    throw new LexAnError("Unknown token \"" + ch + "\"");
                }
        }
        this.currentToken = nextToken;
        return nextToken;
    };
    LexAn.prototype.peekNextToken = function () {
        // Save the current state.
        var oldCurrentToken = this.currentToken;
        var oldInputIndex = this.inputIndex;
        // Extract the next token.
        var nextToken = this.getNextToken();
        // Restore the old state.
        this.inputIndex = oldInputIndex;
        this.currentToken = oldCurrentToken;
        return nextToken;
    };
    /**
     * Peek at the next character without incrementing current position.
     */
    LexAn.prototype.peekNextChar = function () {
        var ch = this.inputText.charAt(this.inputIndex + 1);
        return ch;
    };
    /**
     * Skips the leading spaces from the input text starting at the current
     * processing position.
     */
    LexAn.prototype.skipSpaces = function () {
        while (LexAn.isWhitespace(this.inputText.charAt(this.inputIndex))) {
            this.inputIndex++;
        }
    };
    /**
     * Extracts the number from the current pocessing position in the input text.
     */
    LexAn.prototype.extractNumber = function () {
        var extractedNumber = 0;
        var extractedNumberString = "";
        for (;;) {
            var ch = this.inputText.charAt(this.inputIndex);
            // Note: an empty string is returned in ch if the index goes out of bounds.
            if (LexAn.isNumber(ch)) {
                extractedNumberString = extractedNumberString + ch;
                this.inputIndex++;
            }
            else {
                break;
            }
        }
        return extractedNumber = parseInt(extractedNumberString);
    };
    /**
     * Extracts the indentifier from the current pocessing position in the input text.
     */
    LexAn.prototype.extractIdentifier = function () {
        var extractedIdentifier = "";
        for (;;) {
            var ch = this.inputText.charAt(this.inputIndex);
            // Note: an empty string is returned in ch if the index goes out of bounds.
            if (LexAn.isAlpha(ch)) {
                extractedIdentifier = extractedIdentifier + ch;
                this.inputIndex++;
            }
            else {
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
        return ch.match(/^[a-z]+$/i) !== null;
    };
    /**
     * Determines if the supplied character string is an alpha character.
     * @param ch Character to test.
     */
    LexAn.isNumber = function (ch) {
        return ch.match(/^[0-9]+$/) !== null;
    };
    return LexAn;
}());
exports.LexAn = LexAn;
//# sourceMappingURL=LexAn.js.map