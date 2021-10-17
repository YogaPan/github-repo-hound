import Repo from "./Repo";
import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  if (error) return <p>error</p>;
  if (loading) return <LoadingIcon />;

  return (
    <RepoListContainer>
      {repos.map((repo) => (
        <Repo key={repo.id} repo={repo} />
      ))}
    </RepoListContainer>
  );
}

export default RepoList;
