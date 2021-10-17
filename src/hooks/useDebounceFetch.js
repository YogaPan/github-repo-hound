import { useEffect, useMemo } from "react";
import debounce from "../utils/debounce";
import useFetchRepos from "./useFetchRepos";

export default function useDebounceFetch(query, page, delay, perPage) {
  const { fetchRepos, repos, loading, error } = useFetchRepos(perPage);

  const debounceFetchRepos = useMemo(
    () => debounce(fetchRepos, delay),
    [fetchRepos, delay]
  );
  useEffect(() => {
    debounceFetchRepos(query, page);
  }, [debounceFetchRepos, query, page]);

  return { repos, loading, error };
}
