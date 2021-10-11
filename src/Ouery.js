const githubQuery = (pageCount, queryString) => {
    return {
        query: `
    {
        viewer {
            name
        }
            search(query: "${queryString} user:hack-e-d sort:updated-desc", type: REPOSITORY, first: ${pageCount}) {
                repositoryCount
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
  ` }
};

export default githubQuery;