import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const read = (name) => readFileSync(join(root, name), 'utf8')

test('Free fork retains its MIT attribution', () => {
  const license = read('LICENSE.md')
  assert.match(license, /MIT License/)
  assert.match(license, /mickasmt/)
})

test('core feature declarations remain present for prune compatibility', () => {
  const features = read('config/features.ts')
  for (const key of ['auth', 'billing', 'admin', 'docs', 'blog', 'changelog']) {
    assert.match(features, new RegExp('\\b' + key + ':\\s*\\{'))
  }
})

test('agent delivery documents and staging guardrails are present', () => {
  assert.match(read('AGENTS.md'), /Modules/)
  assert.match(read('docs/ROADMAP.md'), /M0/)
  assert.match(read('docs/COOLIFY.md'), /feat\\/vkn-saas-foundation/)
  assert.match(read('docs/DEVELOPMENT_WORKFLOW.md'), /Coolify/)
})

test('the foundation CI workflow includes build and smoke stages', () => {
  const workflow = read('.github/workflows/foundation-ci.yml')
  assert.match(workflow, /pnpm test/)
  assert.match(workflow, /pnpm lint/)
  assert.match(workflow, /pnpm typecheck/)
  assert.match(workflow, /pnpm build/)
  assert.match(workflow, /HTTP smoke/)
})
