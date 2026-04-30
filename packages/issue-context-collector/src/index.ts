import 'dotenv/config'
import { Octokit } from '@octokit/core'

const octokit = new Octokit({ auth: process.env.GITHUB_PAT })

const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
  headers: {
    'X-GitHub-Api-Version': '2026-03-10',
  },
  owner: 'facebook',
  repo: 'react',
  state: 'all',
  sort: 'comments',
})

console.log(
  response.data.map((issue) => ({
    title: issue.title,
    comments: issue.comments,
    url: issue.html_url,
  })),
)
