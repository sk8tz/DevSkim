import * as DevSkimObjects from "../../devskimObjects";
/**
 * Abstract base class that all of the file writers (settings, results, etc.) share, to cut down
 * on duplicate code, and make polymorphism easier when generally referencing one of a number of
 * "writer" classes
 */
export declare abstract class DevSkimFileWriter {
    protected devskimSettings: DevSkimObjects.IDevSkimSettings;
    protected outputLocation: string;
    protected fileExtension: string;
    protected defaultFileName: string;
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
     * Output the current findings that have been added with createRun.  This will use the file path
     * specified during the setOutputLocale call, and will overwrite any existing file already there. Will write in the appropriate format for each class
     * determined by the call to createOutput
     *
     * If the outputLocation string is an empty string, it will instead be written to the console
     */
    writeOutput(): void;
    /**
     * Generate the output string that will either be written to the console or to a file by writeOutput
     * the base implementation for writeOutput calls the function and then writes out to the given location
     * so all that is necessary is defining the output to be written
     */
    protected abstract createOutput(): string;
    /**
     * Create a short message telling the user the nature of the output created and where it was written
     * e.g. "A template of the DevSkim settings configuration was written to devskim_settings.json"
     */
    protected abstract createOutputConfirmationMessage(): string;
}
/**
 * Base class that all of the result writers share, adding some functions on top of the base DevSkimFileWriter class
 * and creating implementations common to all of the result writers
 */
export declare abstract class DevSkimResultsWriter extends DevSkimFileWriter {
    protected workingDirectory: string;
    protected defaultFileName: string;
    /**
    * Set up initial values
    * @param settings the settings that this instance of DevSkim Analysis was with
    * @param analyzedDirectory directory that was analyzed (NOT the directory to the output is written to - that will go in the same directory devskim was run from)
    */
    initialize(settings: DevSkimObjects.IDevSkimSettings, analyzedDirectory: string): void;
    /**
     * Create a short message telling the user the nature of the output created and where it was written
     */
    protected createOutputConfirmationMessage(): string;
    /**
     * Each folder with git repo info and files should go under its own run, as well as the parent directory
     * if it contains files, even if it does not have git info.  This populates information to be written out
     * from that run
     * @param analysisRun all of the information from the analysis of a directory and its contents/sub-directories
     */
    abstract createRun(analysisRun: DevSkimObjects.Run): void;
}
export declare abstract class DevskimSettingsWriter extends DevSkimFileWriter {
    protected defaultFileName: string;
    /**
     * Set up the interface
     * @param settings the settings being written to output
     */
    initialize(settings: DevSkimObjects.IDevSkimSettings): void;
    /**
     * Create a short message telling the user the nature of the output created and where it was written
     */
    protected createOutputConfirmationMessage(): string;
}
/** various formats that the output may be written as */
export declare enum OutputFormats {
    Text = 0,
    SARIF21 = 1,
    HTML = 2,
    CSV = 3,
    JSON = 4
}
