"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONSettingsWriter = void 0;
/* ------------------------------------------------------------------------------------------
 * JSON output writer class for settings json
 *
 */
const outputWriter_1 = require("../outputWriter");
class JSONSettingsWriter extends outputWriter_1.DevskimSettingsWriter {
    /**
     * Generate the output string that will either be written to the console or to a file by writeOutput
     * the base implementation for writeOutput calls the function and then writes out to the given location
     * so all that is necessary is defining the output to be written
     */
    createOutput() {
        return JSON.stringify(this.devskimSettings, null, 4);
    }
    /**
     * Set up the interface
     * @param settings the settings being written to output
     */
    initialize(settings) {
        super.initialize(settings);
        this.fileExtension = "json";
    }
}
exports.JSONSettingsWriter = JSONSettingsWriter;
//# sourceMappingURL=jsonWriter.js.map