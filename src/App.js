import { useState, useEffect, useMemo } from "react";
import Input from "./Input/Input";
import RepoList from "./RepoList/RepoList";
import debounce from "./utils/debounce";
import GithubAPI from "./utils/githubAPI";
import "./App.css";

const debounceDelayInMs = 500;

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => setQuery(e.target.value);

  const fetchRepos = (query, page) => {
    if (!query) {
      setPage(1);
      setLoading(false);
      setError(false);
      setRepos([]);
      return;
    }

    setLoading(true);
    GithubAPI.searchRepo(query)
      .paginate(page, perPage)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        setRepos(body.items);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setRepos([]);
        setPage(1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debounceFetchRepos = useMemo(
    () => debounce(fetchRepos, debounceDelayInMs),
    []
  );
  useEffect(() => {
    debounceFetchRepos(query, page);
  }, [debounceFetchRepos, query, page]);

  return (
    <div className="App">
      <Input value={query} onChange={handleInputChange} />
      <RepoList repos={repos} loading={loading} error={error} />
    </div>
  );
}

export default App;
