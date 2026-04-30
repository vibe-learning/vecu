import type { Endpoints } from '@octokit/types'
import { octokit } from './octokit.js'
import { headers } from './shared.js'

export async function getIssueBody(
  owner: string,
  repo: string,
  issue_number: number,
): Promise<Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}']['response']> {
  const response = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    headers,
    owner,
    repo,
    issue_number,
  })
  return response
}

export async function getIssueComments(
  owner: string,
  repo: string,
  issue_number: number,
): Promise<Endpoints['GET /repos/{owner}/{repo}/issues/{issue_number}/comments']['response']> {
  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      headers,
      owner,
      repo,
      issue_number,
    },
  )
  return response
}

if (import.meta.main) {
  async function cli() {
    const output = process.argv[2] ?? 'output.issue.detail.json'
    if (!output) {
      console.error('Usage:  <output-file>')
      process.exit(1)
    }

    const { writeFile } = await import('node:fs/promises')

    const owner = 'facebook'
    const repo = 'react'
    const issue_number = 13991
    const body = await getIssueBody(owner, repo, issue_number)
    const comments = await getIssueComments(owner, repo, issue_number)
    const data = { body, comments }
    await writeFile(output, JSON.stringify(data, null, 2))
  }
  cli()
}
