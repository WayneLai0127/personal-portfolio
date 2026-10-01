// Build the Pagefind search index used by Nextra 4's <Search>.
//
// Nextra's docs run `pagefind --site .next/server/app`, but Next.js 16 only
// writes prerendered App Router HTML there when no deployment adapter is
// active. On Vercel (which builds through a Next.js adapter) the same HTML is
// written to `.next/server/route-cache/APP_PAGE/<hash>/$/` instead, so that
// command finds no files and fails the build.
//
// This script collects the prerendered content pages from whichever location
// exists into one staging directory, then runs the regular Pagefind CLI on it.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const serverDir = path.join('.next', 'server')
const stagingDir = path.join('.next', 'pagefind-site')
const outputPath = path.join('public', '_pagefind')

function htmlFiles(root) {
  if (!fs.existsSync(root)) return []
  return fs
    .readdirSync(root, { recursive: true })
    .map(String)
    .filter(file => file.endsWith('.html'))
    .map(file => ({ root, file }))
}

const routeCacheDir = path.join(serverDir, 'route-cache', 'APP_PAGE')
const candidates = [
  ...htmlFiles(path.join(serverDir, 'app')),
  ...(fs.existsSync(routeCacheDir)
    ? fs
        .readdirSync(routeCacheDir)
        .flatMap(entry => htmlFiles(path.join(routeCacheDir, entry, '$')))
    : [])
]

fs.rmSync(stagingDir, { recursive: true, force: true })
let staged = 0
for (const { root, file } of candidates) {
  const target = path.join(stagingDir, file)
  if (fs.existsSync(target)) continue // same route found in both locations
  const content = fs.readFileSync(path.join(root, file), 'utf8')
  // Only Nextra content pages carry `data-pagefind-body` (skips _not-found etc.)
  if (!content.includes('data-pagefind-body')) continue
  fs.mkdirSync(path.dirname(target), { recursive: true })
  fs.writeFileSync(target, content)
  staged++
}
if (staged === 0) {
  throw new Error(`Pagefind: no prerendered HTML pages found under ${serverDir}`)
}
console.log(`Pagefind: staged ${staged} prerendered page(s) in ${stagingDir}`)

const bin = path.join(
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'pagefind.cmd' : 'pagefind'
)
execFileSync(bin, ['--site', stagingDir, '--output-path', outputPath], {
  stdio: 'inherit'
})
