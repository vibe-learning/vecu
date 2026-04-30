import type { Endpoints } from '@octokit/types'
import { octokit } from './octokit.js'
import { headers } from './shared.js'

export async function getIssues(
  owner: string,
  repo: string,
): Promise<Endpoints['GET /repos/{owner}/{repo}/issues']['response']> {
  const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    headers,
    owner,
    repo,
    state: 'all',
    sort: 'comments',
  })
  return response
}

if (import.meta.main) {
  async function cli() {
    const output = process.argv[2] ?? 'output.issues.json'
    if (!output) {
      console.error('Usage:  <output-file>')
      process.exit(1)
    }

    const { writeFile } = await import('node:fs/promises')

    const data = await getIssues('facebook', 'react')
    await writeFile(output, JSON.stringify(data, null, 2))
  }
  cli()
}
