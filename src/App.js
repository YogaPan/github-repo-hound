import { useState, useEffect, useMemo } from "react";
import Input from "./Input/Input";
import RepoList from "./RepoList/RepoList";
import mockResponse from "./mock/mockResponse.json";
import debounce from "./utils/debounce";
import "./App.css";

const mockFetch = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockResponse), 1000));

const debounceDelayInMs = 1000;

function App() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => setQuery(e.target.value);

  const fetchRepos = (query) => {
    setLoading(true);
    mockFetch(query)
      .then((response) => {
        setRepos(response.items);
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
