import { LexAn } from "./LexAn"

export type VariableStore = Map<String, number>;

/**
 * Expression Evaluator.
 */
export class ExprEval {
    variableStore: VariableStore

    constructor(variableStore: VariableStore) {
        this.variableStore = variableStore
    }

}