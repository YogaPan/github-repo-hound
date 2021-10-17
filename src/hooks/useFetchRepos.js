import { useState, useCallback } from "react";
import GithubAPI from "../utils/githubAPI";

export default function useFetchRepos(perPage = 10) {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRepos = useCallback((query, page) => {
    if (!query) {
      setLoading(false);
      setError(false);
      setRepos(null);
      return;
    }

    setLoading(true);
    GithubAPI.searchRepo(query)
      .paginate(page, perPage)
      .then((res) => res.json())
      .then((body) => {
        setRepos(body.items);
        setError(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setRepos(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { fetchRepos, repos, loading, error };
}
