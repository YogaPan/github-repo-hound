import { useState, useEffect } from "react";
import Input from "./Input/Input";
import RepoList from "./RepoList/RepoList";
import mockResponse from "./mock/mockResponse.json";
import "./App.css";

const mockFetch = () =>
  new Promise((resolve) => setTimeout(() => resolve(mockResponse), 1000));

function App() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setLoading(true);

    mockFetch()
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
  }, [query]);

  return (
    <div className="App">
      <Input value={query} onChange={handleInputChange} />
      <RepoList repos={repos} loading={loading} error={error} />
    </div>
  );
}

export default App;
