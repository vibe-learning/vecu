import 'dotenv/config'
import { Octokit } from '@octokit/core'

const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

async function main() {
  const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    headers: {
      'X-GitHub-Api-Version': '2026-03-10',
    },
    owner: 'facebook',
    repo: 'react',
    state: 'all',
    sort: 'comments',
  })
  return response
}

if (import.meta.main) {
  async function cli() {
    const output = process.argv[2] ?? 'output.json'
    if (!output) {
      console.error('Usage:  <output-file>')
      process.exit(1)
    }

    const { writeFile } = await import('node:fs/promises')

    const data = await main()
    await writeFile(output, JSON.stringify(data, null, 2))
  }
  cli()
}
