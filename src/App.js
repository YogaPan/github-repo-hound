import { useState } from "react";
import styled from "styled-components";
import Input from "./components/Input/Input";
import RepoList from "./components/RepoList/RepoList";
import useDebounceFetchRepos from "./hooks/useDebounceFetchRepos";
import useInfiniteScroll from "./hooks/useInfiniteScroll";
import "./App.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Header = styled.div`
  padding: 10px;
`;

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { repos, loading, error } = useDebounceFetchRepos(query, page, 300);
  useInfiniteScroll(() => setPage((page) => page + 1), loading, error);

  const handleInputChange = (e) => {
    setPage(1);
    setQuery(e.target.value);
  };

  return (
    <AppContainer className="App">
      <Header>
        <Input value={query} onChange={handleInputChange} />
      </Header>
      <RepoList repos={repos} loading={loading} error={error} />
    </AppContainer>
  );
}

export default App;
