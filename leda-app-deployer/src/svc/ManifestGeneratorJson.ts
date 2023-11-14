/**
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { getExtensionResourcePath, readFileAsync } from '../utils/helpers';
import * as vscode from 'vscode';
import { LADAlterJSONError, LADLoadTemplateJSONError, LADSaveModifiedJSONError, logToChannelAndErrorConsole } from '../error/customErrors';

export class ManifestGeneratorJson {
  private templateFilePath: string;
  private outputFilePath: string;

  /**
   * Create a new instance of ManifestGenerator.
   * @param {string} templateFilePath - The path to the template JSON file.
   * @param {string} outputFilePath - The path to the output file where the generated JSON will be saved.
   */
  constructor(templateFilePath: string, outputFilePath: string) {
    this.templateFilePath = getExtensionResourcePath(templateFilePath);
    this.outputFilePath = getExtensionResourcePath(outputFilePath);
  }

  public static async readVelocitasJson(velocitasSettings: string): Promise<any> {
    const fileContents = await readFileAsync(getExtensionResourcePath(velocitasSettings));
    const velocitasJson = JSON.parse(fileContents);
    return {
      AppManifestPath: velocitasJson.variables.appManifestPath,
      GithubRepoId: velocitasJson.variables.githubRepoId,
      DockerfilePath: velocitasJson.variables.dockerfilePath,
    };
  }

  public static async readAppManifest(manifestPath: string): Promise<any> {
    const fileContents = await readFileAsync(getExtensionResourcePath(manifestPath));
    const manifestJson = JSON.parse(fileContents);
    const packageName = (manifestJson[0].name as string).toLowerCase();
    return {
      Name: packageName,
    };
  }

  /**
   * Generate the Kanto Container manifest by altering values from the template JSON.
   * @param {Record<string, any>} keyValuePairs - The key-value pairs to modify in the template JSON.
   */
  public generateKantoContainerManifest(keyValuePairs: Record<string, any>, chan: vscode.OutputChannel): void {
    this.loadTemplateJson(chan, (templateJson: any) => {
      const modifiedJson = this.alterJson(chan, templateJson, keyValuePairs);
      this.saveModifiedJson(modifiedJson, chan);
    });
  }

  /**
   * Load the template JSON file.
   * @param {Function} callback - The callback function to handle the parsed JSON data from the template file.
   */
  private loadTemplateJson(chan: vscode.OutputChannel, callback: (templateJson: any) => void): void {
    fs.readFile(this.templateFilePath, 'utf8', (err, fileContents) => {
      try {
        if (err) {
          throw logToChannelAndErrorConsole(chan, new LADLoadTemplateJSONError(err as Error), 'Error reading template JSON file');
        }
        const templateJson = JSON.parse(fileContents);
        callback(templateJson);
      } catch (err) {
        throw logToChannelAndErrorConsole(chan, new LADLoadTemplateJSONError(err as Error), 'Error parsing template JSON');
      }
    });
  }

  /**
   * Alter the JSON object by replacing values based on key-value pairs.
   * @param {any} jsonObj - The JSON object to modify.
   * @param {Record<string, any>} keyValuePairs - The key-value pairs to modify in the JSON object.
   * @returns {any} The modified JSON object.
   */
  private alterJson(chan: vscode.OutputChannel, jsonObj: any, keyValuePairs: Record<string, any>): any {
    const modifiedJson = { ...jsonObj };
    for (const key in keyValuePairs) {
      if (Object.prototype.hasOwnProperty.call(keyValuePairs, key)) {
        const value = keyValuePairs[key];
        const keys = key.split('.');
        let currentObj = modifiedJson;

        for (let i = 0; i < keys.length - 1; i++) {
          const currentKey = keys[i];
          if (!currentObj.hasOwnProperty(currentKey)) {
            throw logToChannelAndErrorConsole(chan, new LADAlterJSONError(new Error(`Key '${currentKey}' not found in JSON object.`)), 'Check keys');
          }
          currentObj = currentObj[currentKey];
        }

        const lastKey = keys[keys.length - 1];
        if (!currentObj.hasOwnProperty(lastKey)) {
          throw logToChannelAndErrorConsole(chan, new LADAlterJSONError(new Error(`Key '${lastKey}' not found in JSON object.`)), 'Check keys');
        }
        currentObj[lastKey] = value;
      }
    }
    return modifiedJson;
  }

  /**
   * Save the modified JSON object to the specified output file.
   * @param {any} modifiedJson - The modified JSON object to save.
   */
  private saveModifiedJson(modifiedJson: any, chan: vscode.OutputChannel): void {
    const outputDir = path.dirname(this.outputFilePath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const updatedJson = JSON.stringify(modifiedJson, null, 2);
    fs.writeFile(this.outputFilePath, updatedJson, 'utf8', (err) => {
      if (err) {
        throw logToChannelAndErrorConsole(chan, new LADSaveModifiedJSONError(err as Error), 'Error parsing template JSON');
      }
      chan.appendLine(`Adjust Kanto Manifest:\t Modified JSON saved!`);
    });
  }
}
