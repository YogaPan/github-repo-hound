import { useState, useEffect, useMemo } from "react";
import Input from "./Input/Input";
import RepoList from "./RepoList/RepoList";
import debounce from "./utils/debounce";
import GithubAPI from "./utils/githubAPI";
import "./App.css";

const debounceDelayInMs = 500;

function App() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => setQuery(e.target.value);

  const fetchRepos = (query) => {
    if (!query) {
      setLoading(false);
      setError(false);
      setRepos([]);
      return;
    }

    setLoading(true);
    GithubAPI.searchRepo(query)
      .then((response) => response.json())
      .then((body) => {
        setRepos(body.items);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
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
    debounceFetchRepos(query);
  }, [query, debounceFetchRepos]);

  return (
    <div className="App">
      <Input value={query} onChange={handleInputChange} />
      <RepoList repos={repos} loading={loading} error={error} />
    </div>
  );
}

export default App;
