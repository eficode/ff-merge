const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const prUrl = github.context.payload.issue.pull_request.url
    const commentsUrl = github.context.payload.issue.comments_url
    const githubToken = core.getInput('token');
    const octokit = github.getOctokit(githubToken);
    const prDetails = await octokit.request(`GET ${prUrl}`)
    const status = prDetails.status
    const headRef = prDetails.data.head.ref
    console.log("head ref")
    console.log(headRef)
    const baseRef = prDetails.data.base.ref
    console.log("base ref")
    console.log(baseRef)
    core.setOutput('base_ref', baseRef);
    core.setOutput('head_ref', headRef);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
