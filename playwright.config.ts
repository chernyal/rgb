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
 globalSetup: require.resolve('./test/e2e/globalSetup'),

  testDir: TESTS_PATH,

  /* Maximum time one test can run for. */
 timeout: 30 * 1000,

  retries: 1,

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
  * For example in `await expect(locator).toHaveText();`
     */
    timeout: 1000 * 60 * 5,
 },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: CI
 ? [['github'], ['html', {outputFolder: HTML_REPORT_PATH}]]
  : [['list'], ['html', {outputFolder: HTML_REPORT_PATH}]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
  actionTimeout: 10000,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
