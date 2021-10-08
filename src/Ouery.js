const githubQuery = {
    query: `
    {
        viewer {
            name
        }
            search(query: "user:hack-e-d sort:updated-desc", type: REPOSITORY, first: 30) {
                nodes {
                ... on Repository {
                    name
                    description
                    id
                    url
                    licenseInfo {
                        spdxId
                        description
                        body
                    }
                    viewerSubscription
              }
            }
        }
    }
  ` };

export default githubQuery;