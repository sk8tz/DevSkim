import { DevskimSettingsWriter } from "../outputWriter";
import * as DevSkimObjects from "../../../devskimObjects";
export declare class JSONSettingsWriter extends DevskimSettingsWriter {
    /**
     * Generate the output string that will either be written to the console or to a file by writeOutput
     * the base implementation for writeOutput calls the function and then writes out to the given location
     * so all that is necessary is defining the output to be written
     */
    protected createOutput(): string;
    /**
     * Set up the interface
     * @param settings the settings being written to output
     */
    initialize(settings: DevSkimObjects.IDevSkimSettings): void;
}
