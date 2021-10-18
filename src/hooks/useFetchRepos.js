import { useState, useCallback, useRef } from "react";
import { uniqBy } from "lodash";
import GithubAPI from "../utils/githubAPI";
import axios from "axios";

const concatRepos = (a, b) => uniqBy([...a, ...b], "id");

export default function useFetchRepos(perPage = 10) {
  const [repos, setRepos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const cancelRef = useRef();

  const fetchRepos = useCallback(
    (query, page) => {
      cancelRef.current?.cancel("prevent multiple requests in same time");

      if (!query) {
        setLoading(false);
        setError(false);
        setRepos(null);
        return;
      }

      setLoading(true);
      setError(false);
      if (page === 1) setRepos(null);
      cancelRef.current = axios.CancelToken.source();

      GithubAPI.searchRepo(query)
        .paginate(page, perPage)
        .cancelToken(cancelRef.current.token)
        .then((body) => {
          page === 1
            ? setRepos(body.items)
            : setRepos((repos) => concatRepos(repos, body.items));
          setError(false);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
            return;
          }
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [perPage]
  );

  return { fetchRepos, repos, loading, error };
}
