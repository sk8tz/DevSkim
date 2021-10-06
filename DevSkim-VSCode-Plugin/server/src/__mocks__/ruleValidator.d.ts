import { Rule } from "../devskimObjects";
import { Connection } from "vscode-languageserver";
import { IRuleValidator } from "../utility_classes/ruleValidator";
/**
 *
 */
export declare class RuleValidator implements IRuleValidator {
    private connection;
    /**
     *
     * @param connection
     * @param rd
     * @param ed
     */
    constructor(connection: Connection, rd: string, ed: string);
    /**
     *
     * @param readRules
     * @param outputValidation
     */
    validateRules(readRules: Rule[], outputValidation: boolean): Promise<Rule[]>;
}
