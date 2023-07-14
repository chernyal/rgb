// NOTE: load env files before other imports
// eslint-disable-next-line import/order
import {SANITY_E2E_SESSION_TOKEN} from './test/e2e/env'

import os from 'os'
import path from 'path'
import {defineConfig, devices} from '@playwright/test'
