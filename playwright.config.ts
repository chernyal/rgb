// NOTE: load env files before other imports
// eslint-disable-next-line import/order
import {SANITY_E2E_SESSION_TOKEN} from './test/e2e/env'

import os from 'os'
import path from 'path'
import {defineConfig, devices} from '@playwright/test'


// Paths
const TESTS_PATH = path.join(__dirname, 'test', 'e2e', 'tests')
const HTML_REPORT_PATH = path.join(__dirname, 'test', 'e2e', 'report')
const ARTIFACT_OUTPUT_PATH = path.join(__dirname, 'test', 'e2e', 'results')

// OS-specific browsers to include
const OS_BROWSERS =
  os.platform() === 'darwin' ? [{name: 'webkit', use: {...devices['Desktop Safari']}}] : []

// Read environment variables
const CI = readBoolEnv('CI', false)
const E2E_DEBUG = readBoolEnv('SANITY_E2E_DEBUG', false)
const PROJECT_ID = 'ppsg7ml5'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
