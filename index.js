const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const { comments_url, pull_request: { url } } = github.context.payload.issue;

    const githubToken = core.getInput('token');
    const octokit = github.getOctokit(githubToken);

    const prDetails = await octokit.request(`GET ${prUrl}`);

    const status = prDetails.status
    const headRef = prDetails.data.head.ref

    const baseRef = prDetails.data.base.ref

    core.setOutput('base_ref', baseRef);
    core.setOutput('head_ref', headRef);
  } catch (error) {
    core.setFailed(error.message);
  }
})();
