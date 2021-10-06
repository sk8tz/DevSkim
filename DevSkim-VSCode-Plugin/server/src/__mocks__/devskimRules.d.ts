import { Connection } from 'vscode-languageserver/node';
import { DevskimRuleSeverity, IDevSkimSettings } from "../devskimObjects";
import { IRuleValidator } from "../utility_classes/ruleValidator";
/**
 * The bulk of the DevSkim analysis logic.  Loads rules in, exposes functions to run rules across a file
 */
export declare class DevSkimRules {
    private connection;
    private settings;
    private ruleValidator;
    readonly rulesDirectory: string;
    private analysisRules;
    private tempRules;
    private dir;
    constructor(connection: Connection, settings: IDevSkimSettings, ruleValidator: IRuleValidator);
    /**
     * Reload the rules from the file system.  Since this right now is just a proxy for loadRules this *could* have been achieved by
     * exposing loadRules as public.  I chose not to, as eventually it might make sense here to check if an analysis is actively running
     * and hold off until it is complete.  I don't forsee that being an issue when analyzing an individual file (it's fast enough a race condition
     * should exist with reloading rules), but might be if doing a full analysis of a lot of files.  So in anticipation of that, I broke this
     * into its own function so such a check could be added.
     */
    refreshAnalysisRules(): void;
    fromRoot(connection: Connection, rootPath: string | null): void;
    /**
     * Low, Defense In Depth, and Informational severity rules may be turned on and off via a setting
     * prior to running an analysis, verify that the rule is enabled based on its severity and the user settings
     *
     * @private
     * @param {DevskimRuleSeverity} ruleSeverity
     * @returns {boolean}
     *
     * @memberOf DevSkimWorker
     */
    RuleSeverityEnabled(ruleSeverity: DevskimRuleSeverity): boolean;
    /**
     * maps the string for severity received from the rules into the enum (there is inconsistencies with the case used
     * in the rules, so this is case insensitive).  We convert to the enum as we do comparisons in a number of places
     * and by using an enum we can get a transpiler error if we remove/change a label
     *
     * @param {string} severity
     * @returns {DevskimRuleSeverity}
     *
     * @memberOf DevSkimWorker
     */
    static MapRuleSeverity(severity: string): DevskimRuleSeverity;
}
