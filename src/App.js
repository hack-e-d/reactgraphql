import github from "./db";
import { useEffect, useState, useCallback } from "react";
import githubQuery from "./Ouery";
import RepoInfo from "./RepoInfo"
import SearchBox from "./SearchBox";
import NavButtons from "./NavButtons";


function App() {

  let [userName, setUserName] = useState("");
  let [repoList, setRepoList] = useState(null);
  let [pageCount, setPageCount] = useState(10);
  let [queryString, setqueryString] = useState("");
  let [totalCount, settotalCount] = useState(null);
  let [startCursor, setStartCursor] = useState(null);
  let [endCursor, setEndCursor] = useState(null);
  let [hasPreviousPage, setHaspreviousPage] = useState(false);
  let [hasNextPage, setHasnextPage] = useState(true);
  let [paginationKeyword, setPaginationKeyword] = useState("first");
  let [paginationString, setPaginationString] = useState("");  

  const fetchData = useCallback( ( )=> {
    const queryText = JSON.stringify(githubQuery(pageCount, queryString, paginationKeyword, paginationString));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    }) 
    .then((response) => response.json())
    .then((data) => {
      const viewer = data.data.viewer;
      const repos = data.data.search.edges;
      const total = data.data.search.repositoryCount;
      const start = data.data.search.pageInfo?.startCursor;
      const end = data.data.search.pageInfo?.endCursor;
      const next = data.data.search.pageInfo?.hasNextPage;
      const prev = data.data.search.pageInfo?.hasPreviousPage;

      settotalCount(total);
      setUserName(viewer.name);
      setRepoList(repos);
      setStartCursor(start);
      setEndCursor(end);
      setHasnextPage(next);
      setHaspreviousPage(prev);
      // console.log(data);
    })
    .catch((error) =>{
      console.error(error);
    });
  }, [pageCount, queryString, paginationKeyword, paginationString]);
  
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
        <NavButtons start = {startCursor}
        end = {endCursor}
        next = {hasNextPage}
        previous = {hasPreviousPage}
        onPage = {(myKeyword, myString) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }
      }
      />
      {
        repoList && (
          <ul className="list-group list-group-flush">
            {
              repoList.map((repo) => (
                <RepoInfo key={repo.node.id} repo={repo.node} />
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
