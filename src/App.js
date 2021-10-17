import { useState, useEffect } from "react";
import styled from "styled-components";
import Input from "./components/Input/Input";
import RepoList from "./components/RepoList/RepoList";
import useDebounceFetch from "./hooks/useDebounceFetch";
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
  const { repos, loading, error } = useDebounceFetch(query, page);

  const handleInputChange = (e) => setQuery(e.target.value);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        console.warn("you're at the bottom of the page");
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
