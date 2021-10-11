import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./Ouery";
import RepoInfo from "./RepoInfo"
import SearchBox from "./SearchBox";


function App() {

  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setqueryString] = useState("");
  let [totalCount, settotalCount] = useState(null);

  const fetchData = useCallback( ( )=> {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    }) 
    .then((response) => response.json())
    .then((data) => {
      const viewer = data.data.viewer;
      const repos = data.data.search.nodes;
      const total = data.data.search.repositoryCount;
      settotalCount(total);
      setUserName(viewer.name);
      setRepoList(repos);
      // console.log(data);
    })
    .catch((error) =>{
      console.error(error);
    });
  }, [pageCount, queryString]);
  
  useEffect(() => {
    fetchData();
    
  }, [fetchData]);
    
  return (
    <div className="App container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"></i> Repos </h1>
      <p>
        Hey there {userName}
      </p>
      <p>
        Search for : <b>{queryString}</b> | Items per page : <b>{pageCount}</b> | Total results : <b>{totalCount}</b>
      </p>
      <SearchBox
        totalCount = {totalCount}
        pageCount = {pageCount}
        onTotalChange = {(myNumber) => setPageCount(myNumber)}
        onQueryChange = {(myString) => setqueryString(myString)}
        />
      {
        repoList && (
          <ul className="list-group list-group-flush">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.id} repo={repo} />
              )
            )
        }
          </ul>
        )
      }
    </div>
  );
}

export default App;
