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

export const DEPLOYMENT_VARIANT_01_CONSOLE_HEADER = `
******************************************************************************
***           DEPLOYMENT-VARIANT 01 - Remote Build and Deployment          ***
******************************************************************************

For further informations/dependencies/configuration refer to the User Manual.
-> Open the User Manual via (i)-button.
`;

export const DEPLOYMENT_VARIANT_02_CONSOLE_HEADER = `
******************************************************************************
***           DEPLOYMENT-VARIANT 02 - Hybrid Build and Deployment          ***
******************************************************************************

For further informations/dependencies/configuration refer to the User Manual.
-> Open the User Manual via (i)-button.
`;

export const DEPLOYMENT_VARIANT_03_CONSOLE_HEADER = `
******************************************************************************
***           DEPLOYMENT-VARIANT 03 - Local Build and Deployment           ***
******************************************************************************

For further informations/dependencies/configuration refer to the User Manual.
-> Open the User Manual via (i)-button.
`;

export const ERROR_CONSOLE_HEADER = `

************ ERROR - Encountered error during extension execution ************

`;

export const TMP_KANTO_CONFIG_PATH = '.vscode/tmp/config.json';
export const KANTO_CONFIG_REMOTE_REG_JSON_PATH = 'containers.registry_configurations["ghcr.io"]';
export const KANTO_CONFIG_LOCAL_REG_JSON_PATH = 'containers.insecure-registries';
export const TEMPLATE_FILE_PATH = '.vscode/templates/kanto_container_conf_template.json';
export const OUTPUT_FILE_PATH = '.vscode/tmp/tmp_gen_kanto_container_manifest.json';
export const MANIFEST_DIR = '/data/var/containers/manifests';
export const KANTO_CONFIG_FILE = '/etc/container-management/config.json';
export const PACKAGE_TYPE = 'container';
export const LOCAL_KANTO_REGISTRY = 'localhost:5000';
export const TARBALL_OUTPUT_PATH = '.vscode/tmp';
export const CONTAINER_REGISTRY = {
  ghcr: 'ghcr.io',
  docker: 'docker.io',
};
export const TARGET_CONTAINER_PLATFORM = 'linux/arm64';
export const VELOCITAS_CONFIG_FILE = '.velocitas.json';
export const NECESSARY_DEVICE_CLI_TOOLINGS = [
  { name: 'kanto-cm', type: 'cli' },
  { name: 'ctr', type: 'cli' },
  { name: 'kanto-auto-deployer', type: 'service' },
  { name: 'container-management', type: 'service' },
];
