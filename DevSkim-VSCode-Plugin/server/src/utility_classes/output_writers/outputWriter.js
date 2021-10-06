"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFormats = exports.DevskimSettingsWriter = exports.DevSkimResultsWriter = exports.DevSkimFileWriter = void 0;
/**
 * Abstract base class that all of the file writers (settings, results, etc.) share, to cut down
 * on duplicate code, and make polymorphism easier when generally referencing one of a number of
 * "writer" classes
 */
class DevSkimFileWriter {
    constructor() {
        this.outputLocation = "";
        this.fileExtension = "txt";
        this.defaultFileName = "devskim_results";
    }
    /**
       * Get the default file name that output will be written to, absent a user specified file name
       * @return the default file name. to be used if no file name was provided from the command line
       */
    getDefaultFileName() {
        return this.defaultFileName + "." + this.fileExtension;
    }
    /**
     * Sets where the output is sent.  If an empty string, output is echoed to the console, otherwise the output is
     * used as a file name.  If not a full path, it will write to the current working directory
     * @param outputLocale location to write output to
     */
    setOutputLocale(outputLocale) {
        //add a file extension if they left it off
        if (outputLocale.length > 0 && outputLocale.indexOf(".") == -1) {
            outputLocale = outputLocale + "." + this.fileExtension;
        }
        this.outputLocation = outputLocale;
    }
    /**
     * Output the current findings that have been added with createRun.  This will use the file path
     * specified during the setOutputLocale call, and will overwrite any existing file already there. Will write in the appropriate format for each class
     * determined by the call to createOutput
     *
     * If the outputLocation string is an empty string, it will instead be written to the console
     */
    writeOutput() {
        let output = this.createOutput();
        if (this.outputLocation.length == 0) {
            console.log(output);
        }
        else {
            let fs = require("fs");
            fs.writeFile(this.outputLocation, output, (err) => { });
            console.log(this.createOutputConfirmationMessage());
            console.log();
        }
    }
}
exports.DevSkimFileWriter = DevSkimFileWriter;
/**
 * Base class that all of the result writers share, adding some functions on top of the base DevSkimFileWriter class
 * and creating implementations common to all of the result writers
 */
class DevSkimResultsWriter extends DevSkimFileWriter {
    constructor() {
        super(...arguments);
        this.defaultFileName = "devskim_results";
    }
    /**
    * Set up initial values
    * @param settings the settings that this instance of DevSkim Analysis was with
    * @param analyzedDirectory directory that was analyzed (NOT the directory to the output is written to - that will go in the same directory devskim was run from)
    */
    initialize(settings, analyzedDirectory) {
        this.devskimSettings = settings;
        this.workingDirectory = analyzedDirectory;
    }
    /**
     * Create a short message telling the user the nature of the output created and where it was written
     */
    createOutputConfirmationMessage() {
        return "Analyzed all files under \"" + this.workingDirectory + "\" and wrote the findings to " + this.outputLocation;
    }
}
exports.DevSkimResultsWriter = DevSkimResultsWriter;
class DevskimSettingsWriter extends DevSkimFileWriter {
    constructor() {
        super(...arguments);
        this.defaultFileName = "devskim_settings";
    }
    /**
     * Set up the interface
     * @param settings the settings being written to output
     */
    initialize(settings) {
        this.devskimSettings = settings;
        //remove settings irrelevant for the CLI
        delete this.devskimSettings.suppressionDurationInDays;
        delete this.devskimSettings.manualReviewerName;
        delete this.devskimSettings.suppressionCommentStyle;
        delete this.devskimSettings.suppressionCommentPlacement;
        delete this.devskimSettings.removeFindingsOnClose;
        delete this.devskimSettings.toolInfo;
    }
    /**
     * Create a short message telling the user the nature of the output created and where it was written
     */
    createOutputConfirmationMessage() {
        return "Creating a settings template file to be customize analysis runs, and wrote the file to " + this.outputLocation;
    }
}
exports.DevskimSettingsWriter = DevskimSettingsWriter;
/** various formats that the output may be written as */
var OutputFormats;
(function (OutputFormats) {
    OutputFormats[OutputFormats["Text"] = 0] = "Text";
    OutputFormats[OutputFormats["SARIF21"] = 1] = "SARIF21";
    OutputFormats[OutputFormats["HTML"] = 2] = "HTML";
    OutputFormats[OutputFormats["CSV"] = 3] = "CSV";
    OutputFormats[OutputFormats["JSON"] = 4] = "JSON";
})(OutputFormats = exports.OutputFormats || (exports.OutputFormats = {}));
//# sourceMappingURL=outputWriter.js.map