"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevSkimRules = void 0;
/* ------------------------------------------------------------------------------------------
 *
 * This file contains the actual meat and potatoes of analysis.  The DevSkimWorker class does
 * the actual work of analyzing data it was given
 *
 * Most of the type declarations representing things like the rules used to analyze a file, and
 * problems found in a file, are in devskimObjects.ts
 *
 * ------------------------------------------------------------------------------------------ */
const fs = require("fs");
const { promisify } = require('util');
const { glob } = require('glob-promise');
const readFile = promisify(fs.readFile);
const devskimObjects_1 = require("../devskimObjects");
/**
 * The bulk of the DevSkim analysis logic.  Loads rules in, exposes functions to run rules across a file
 */
class DevSkimRules {
    constructor(connection, settings, ruleValidator) {
        this.connection = connection;
        this.settings = settings;
        this.ruleValidator = ruleValidator;
        this.dir = require('node-dir');
        // this.rulesDirectory = DevSkimWorkerSettings.getRulesDirectory();
        // this.loadRules();
    }
    /**
     * Reload the rules from the file system.  Since this right now is just a proxy for loadRules this *could* have been achieved by
     * exposing loadRules as public.  I chose not to, as eventually it might make sense here to check if an analysis is actively running
     * and hold off until it is complete.  I don't forsee that being an issue when analyzing an individual file (it's fast enough a race condition
     * should exist with reloading rules), but might be if doing a full analysis of a lot of files.  So in anticipation of that, I broke this
     * into its own function so such a check could be added.
     */
    refreshAnalysisRules() {
        // this.loadRules();
    }
    fromRoot(connection, rootPath) {
        /*
        */
    }
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
    RuleSeverityEnabled(ruleSeverity) {
        return true;
    }
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
    static MapRuleSeverity(severity) {
        return devskimObjects_1.DevskimRuleSeverity.Critical;
    }
}
exports.DevSkimRules = DevSkimRules;
//# sourceMappingURL=devskimRules.js.map