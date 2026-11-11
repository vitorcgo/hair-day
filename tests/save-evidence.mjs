import { mkdir, readFile, writeFile } from 'node:fs/promises'

const report = JSON.parse(await readFile('test-results/results.json', 'utf8'))
const tests = []

function collect(suites) {
  for (const suite of suites) {
    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests) {
        tests.push({
          title: spec.title,
          project: test.projectName,
          status: test.status,
          results: test.results.map((result) => ({ status: result.status, durationMs: result.duration })),
        })
      }
    }
    collect(suite.suites ?? [])
  }
}

collect(report.suites)
await mkdir('docs/evidence', { recursive: true })
await writeFile('docs/evidence/playwright-results.json', `${JSON.stringify({
  generatedFrom: 'Playwright JSON reporter — test-results/results.json',
  playwrightVersion: report.config.version,
  nodeVersion: process.version,
  platform: process.platform,
  stats: report.stats,
  tests,
}, null, 2)}\n`)
console.log('Evidência salva em docs/evidence/playwright-results.json')
