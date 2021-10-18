import { useMemo, useEffect } from "react";
import debounce from "../utils/debounce";
import useFetchRepos from "./useFetchRepos";

export default function useDebounceFetchRepos(query, page, delay) {
  const { fetchRepos, repos, loading, error } = useFetchRepos();

  const debounceFetchRepos = useMemo(
    () => debounce(fetchRepos, delay),
    [fetchRepos, delay]
  );

  useEffect(() => {
    debounceFetchRepos(query, page);
  }, [debounceFetchRepos, query, page]);

  return { fetchRepos, debounceFetchRepos, repos, loading, error };
}
