import * as DevSkimObjects from "../../../devskimObjects";
import { DevSkimResultsWriter } from "../outputWriter";
/**
 * Class to write output in SARIF v2.1 format
 * The correct order to use this is initialize, (optional) setOutputLocale, createRun for each run, writeOutput
 */
export declare class SARIF21ResultWriter extends DevSkimResultsWriter {
    private SarifFileObject;
    /**
    * Set up the SARIF object, recording the settings this analysis was run under, and
    * the top level SARIF information (version, schema, etc.)
    * @param settings the settings that this instance of DevSkim Analysis was with
    * @param analyzedDirectory directory that was analyzed (NOT the directory to the output is written to - that will go in the same directory devskim was run from)
    */
    initialize(settings: DevSkimObjects.IDevSkimSettings, analyzedDirectory: string): void;
    /**
    * Get the default file name that output will be written to, absent a user specified file name
    * @return the default file name. to be used if no file name was provided from the command line
    */
    getDefaultFileName(): string;
    /**
     * Sets where the output is sent.  If an empty string, output is echoed to the console, otherwise the output is
     * used as a file name.  If not a full path, it will write to the current working directory
     * @param outputLocale location to write output to
     */
    setOutputLocale(outputLocale: string): void;
    /**
     * Each folder with git repo info and files should go under its own run, as well as the parent directory
     * if it contains files, even if it does not have git info.  This populates information to be written out
     * from that run, adding them to the appropriate SARIF objects.  It also sets up the tool info for each run
     * @param analysisRun all of the information from the analysis of a directory and its contents/sub-directories
     */
    createRun(analysisRun: DevSkimObjects.Run): void;
    /**
     * Add all of the rules from this analysis run to the Sarif object that will be output (Goes into runs[runNumber].tool.driver.rules in the output)
     * @param rules array of all of the rules loaded.  The settings that the overall object was instantiated with in the constructor determine
     * if the manual review and best practice rules are included
     * @param runNumber the run that these rules were used in
     */
    private addRules;
    /**
     * Add all of the files analyzed to the sarif output.  This goes in runs[runNumber].artifacts
     * @param files array of all of the files and their meta data that were analyzed
     * @param runNumber the run that these files were recorded from
     */
    private addFiles;
    /**
     * Add the results of the analysis to the sarif object.  Will populate runs[runNumber].results in the output
     * @param problems array of every finding from the analysis run
     * @param directory the parent directory these findings were found under
     * @param runNumber the run that these findings came from
     */
    private addResults;
    /**
     * Generate the output string that will either be written to the console or to a file by writeOutput
     * the base implementation for writeOutput calls the function and then writes out to the given location
     * so all that is necessary is defining the output to be written
     */
    protected createOutput(): string;
}
