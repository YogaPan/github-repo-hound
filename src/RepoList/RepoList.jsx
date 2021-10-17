import Repo from "./Repo";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ErrorDisplay from "./ErrorDisplay";
import NotFoundDisplay from "./NotFoundDisplay";

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

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  color: #ccc;
  font-size: 50px;
  animation: App-logo-spin infinite 0.5s linear;
`;

function RepoList({ repos, loading, error }) {
  const notFound = repos && repos.length === 0;

  if (error) return <ErrorDisplay error={error} />;
  if (loading) return <LoadingIcon />;
  if (notFound) return <NotFoundDisplay />;

  return (
    <RepoListContainer>
      {repos?.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </RepoListContainer>
  );
}

export default RepoList;
