import Repo from "./Repo";
import styled from "styled-components";
import ErrorDisplay from "./ErrorDisplay";
import NotFoundDisplay from "./NotFoundDisplay";
import LoadingDisplay from "./LoadingDisplay";

const RepoListContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  width: 600px;

  > * + * {
    margin-top: 10px;
  }
`;

function RepoList({ repos, loading, error }) {
  const notFound = repos && repos.length === 0;
  if (notFound) return <NotFoundDisplay />;

  return (
    <>
      <RepoListContainer>
        {repos?.map((repo) => (
          <Repo key={repo.id} repo={repo} />
        ))}
      </RepoListContainer>
      {error && <ErrorDisplay error={error} />}
      {loading && <LoadingDisplay />}
    </>
  );
}

export default RepoList;
