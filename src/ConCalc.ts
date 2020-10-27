import { ReadLine, createInterface } from "readline"
import { CommandExecutor } from "./command/CommandExecutor"
import { CommandImplementor } from "./command/CommandParser"
import { ExprEval, VariableStore } from "./ExprEval"

export class ConCalc implements CommandImplementor {
    readonly ANSWER_VAR_NAME = "$ANS"
    vs: VariableStore
    ee: ExprEval
    cmdParser: CommandExecutor
    rl: ReadLine

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

        this.rl.on('line', (line: string) => {
            let trimmedLine = line.trim()

            // Ignore empty lines.
            if (trimmedLine.length === 0) {
                return
            }

            // A comment line
            if (trimmedLine.startsWith("#")) {
                return
            }

            let isCommand = false;
            try {
                isCommand = this.cmdParser.parse(trimmedLine)
            } catch (commandError) {
                console.error("[ERROR] " + commandError.message)
            }

            if (!isCommand) {
                // Assume anthing else is an expression, let the expression evalutor handle it.
                try {
                    let eeResult = this.ee.evaluate(trimmedLine)
                    this.vs.set(this.ANSWER_VAR_NAME, eeResult)
                    console.log("[" + this.ANSWER_VAR_NAME + "] " + eeResult)
                } catch (exprError) {
                    console.error("[ERROR] " + exprError.message)
                }
            }
        })
    }
    onCommandVars(): void {
        this.vs.forEach((value, key, map) => {
            console.log(key + " : " + value)
        })
    }

    onCommandExit(): void {
        this.rl.close()
    }
}
