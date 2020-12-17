import { ReadLine, createInterface } from "readline"
import { CommandExecutor } from "./command/CommandExecutor"
import { CommandImplementor } from "./command/CommandParser"
import { ExprEval, VariableStore, OperatingMode } from "./ExprEval"
import { ResultFormatter, ResultMode } from "./ResultFormatter"

export class ConCalc implements CommandImplementor {
    readonly ANSWER_VAR_NAME = "$ANS"
    readonly APP_NAME = "CONCALC"
    vs: VariableStore
    ee: ExprEval
    cmdParser: CommandExecutor
    rl: ReadLine
    rf = new ResultFormatter()

    constructor() {
        this.vs = new Map()
        this.vs.set(this.ANSWER_VAR_NAME, 0)
        this.ee = new ExprEval(this.vs)
        this.cmdParser = new CommandExecutor(this)

        this.rl = createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        })

        this.displayPrompt()

        this.rl.on('line', (line: string) => {
            let trimmedLine = line.trim()

            // Ignore empty lines and comment lines.
            if (trimmedLine.length === 0 || trimmedLine.startsWith("#")) {
                this.displayPrompt()
                return
            }

            let isCommand = false;
            try {
                isCommand = this.cmdParser.parse(trimmedLine)
            } catch (commandError) {
                console.error("[ERROR] " + commandError.message)
            }

            if (!isCommand) {
                // Assume anything else is an expression, let the expression evaluator handle it.
                try {
                    let eeResult = this.ee.evaluate(trimmedLine)
                    this.vs.set(this.ANSWER_VAR_NAME, eeResult)
                    console.log("[RESULT] " + this.rf.format(eeResult))
                } catch (exprError) {
                    console.error("[ERROR] " + exprError.message)
                }
            }

            this.displayPrompt()

        }).on('close', () => {
            process.exit(0)
        })
    }

    displayPrompt() : void {

        let prompt = this.APP_NAME

        switch(this.ee.getOperatingMode()) {
            case OperatingMode.PROGRAMMER:
                prompt +=
                "/" + OperatingMode[this.ee.getOperatingMode()] +
                "/" + this.rf.getPrecision() + "-BITS"
                break;

            case OperatingMode.REAL:
                prompt +=
                "/" + OperatingMode[this.ee.getOperatingMode()] +
                "/" + ResultMode[this.rf.getMode()]
                break;
        }

        prompt += " :> "


        this.rl.setPrompt(prompt)
        this.rl.prompt(true)
    }

    onCommandVars(): void {
        console.log("Variables store contains:")
        this.vs.forEach((value, key, map) => {
            console.log(" - " + key + " : " + this.rf.format(value))
        })
    }

    onCommandExit(): void {
        this.rl.close()
    }

    onCommandFix(precision: number): void {
        this.rf.setMode(ResultMode.FIXED)
        this.rf.setPrecision(precision)
    }

    onCommandSci(precision: number): void {
        this.rf.setMode(ResultMode.SCIENTIFIC)
        this.rf.setPrecision(precision)
    }

    onCommandReal(): void {
        this.ee.setOperatingMode(OperatingMode.REAL)
        this.rf.setMode(ResultMode.AUTO)
    }

    onCommandProg(bits: number): void {
        this.ee.setOperatingMode(OperatingMode.PROGRAMMER)
        this.rf.setMode(ResultMode.PROGRAMMER)
        this.rf.setPrecision(bits)
    }
}
