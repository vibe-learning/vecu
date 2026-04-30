import { readFile } from 'node:fs/promises'
import type { OctokitResponse } from '@octokit/types'

export async function collectIssueContext() {}

async function main(input: string) {
  const data = await readFile(input, 'utf-8')
  const { body, comments } = JSON.parse(data) as {
    body: OctokitResponse<any>
    comments: OctokitResponse<any>
  }

  let issueMarkdown = `${body.data.body}\n\n`
  issueMarkdown += comments.data.map((comment: any) => comment.body).join('\n\n')

  console.log(issueMarkdown)
}

if (import.meta.main) {
  async function cli() {
    const input = process.argv[2]
    if (!input) {
      console.error('Usage:  <input-file>')
      process.exit(1)
    }

    await main(input)
  }
  cli()
}
