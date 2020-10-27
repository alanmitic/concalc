import { ReadLine, createInterface } from "readline"
import { CommandImplementor, CommandExecutor } from "./CommandExecutor"
import { ExprEval, VariableStore } from "./ExprEval"

export class ConCalc implements CommandImplementor {
    readonly ANSWER_VAR_NAME = "$ANS"
    vs: VariableStore
    ee: ExprEval
    cmdExec: CommandExecutor
    rl: ReadLine

    constructor() {
        this.vs = new Map()
        this.ee = new ExprEval(this.vs)
        this.cmdExec = new CommandExecutor(this)

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

            // Check for commands, commands start with "@".
            if (trimmedLine.startsWith("@")) {
                try {
                    this.cmdExec.execute(trimmedLine)
                } catch (commandError) {
                    console.error("[ERROR] " + commandError.message)
                }
                return
            }

            // Assume anthing else is an expression, let the expression evalutor handle it.
            try {
                let eeResult = this.ee.evaluate(trimmedLine)
                this.vs.set(this.ANSWER_VAR_NAME, eeResult)
                console.log("[" + this.ANSWER_VAR_NAME + "] " + eeResult)
            } catch (exprError) {
                console.error("[ERROR] " + exprError.message)
            }
        })
    }

    onCommandExit(): void {
        this.rl.close()
    }
}
