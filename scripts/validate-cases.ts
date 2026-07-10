/**
 * CI gate for the case queue. Validates every JSON file in cases/ against the
 * schema and rejects duplicate ids or publish dates. Exits non-zero on any
 * problem so a bad case can never reach the queue. Safe to run with no cases/.
 */
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { caseSchema } from '../src/lib/caseSchema'

// Resolve relative to this script, not the process cwd, so it works the same
// from CI (repo root) and from anywhere locally.
const CASES_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'cases')

function main(): void {
  let files: string[]
  try {
    files = readdirSync(CASES_DIR).filter((f) => f.endsWith('.json'))
  } catch {
    console.log('No cases/ directory — nothing to validate.')
    return
  }

  const errors: string[] = []
  const seenIds = new Set<string>()
  const seenDates = new Set<string>()

  for (const file of files.sort()) {
    let json: unknown
    try {
      json = JSON.parse(readFileSync(join(CASES_DIR, file), 'utf8'))
    } catch (e) {
      errors.push(`${file}: invalid JSON (${(e as Error).message})`)
      continue
    }

    const result = caseSchema.safeParse(json)
    if (!result.success) {
      const detail = result.error.issues
        .map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('; ')
      errors.push(`${file}: ${detail}`)
      continue
    }

    const c = result.data
    if (seenIds.has(c.id)) errors.push(`${file}: duplicate id ${c.id}`)
    if (seenDates.has(c.publish_date)) errors.push(`${file}: duplicate publish_date ${c.publish_date}`)
    seenIds.add(c.id)
    seenDates.add(c.publish_date)
  }

  if (errors.length > 0) {
    console.error(`Case validation failed (${errors.length} problem(s)):`)
    for (const e of errors) console.error(`  - ${e}`)
    process.exit(1)
  }

  console.log(`Validated ${files.length} case(s). All good.`)
}

main()
