import { defineConfig } from '@playwright/test'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  maxFailures: 1,
  retries: 0,
  outputDir: path.join(root, 'test-results'),
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(root, 'playwright-report'), open: 'never' }],
    ['json', { outputFile: path.join(root, 'test-results/results.json') }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4180',
    browserName: 'chromium',
    // Permite aproveitar Chrome/Edge instalado quando não houver espaço para baixar Chromium.
    channel: process.env.PLAYWRIGHT_CHANNEL,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    colorScheme: 'dark',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: 'mobile',
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 1,
      },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4180 --strictPort',
    url: 'http://127.0.0.1:4180',
    cwd: root,
    reuseExistingServer: false,
    stdout: 'pipe',
    timeout: 120_000,
  },
})
