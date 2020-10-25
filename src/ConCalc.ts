import { ReadLine, createInterface } from "readline"
import { CommandImplementor, CommandExecutor } from "./CommandExecutor"
import { ExprEval, VariableStore } from "./ExprEval"

export class ConCalc implements CommandImplementor {
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

        this.rl.on('line',  (line: string) => {
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
                this.cmdExec.execute(trimmedLine)
                return
            }

            // Assume anthing else is an expression, let the expression evalutor handle it.
            let eeResult = this.ee.evaluate(trimmedLine)
            console.log(eeResult)
        })
    }

    onCommandExit(): void {
        this.rl.close()
    }
}



