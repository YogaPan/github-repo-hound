import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";

const RepoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid black;
  border-radius: 25px;
  padding: 15px;
  padding: 15px 15px 10px 15px;
  width: 100%;
  border: 2px solid #eee;
  background-color: #f3f3f3;
  text-align: left;

  a {
    color: #2196f3;
    font-size: 25px;
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  > * + * {
    margin-top: 10px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  > * + * {
    margin-left: 5px;
  }
`;

export default function Repo({ repo }) {
  const { full_name, html_url, stargazers_count, description } = repo;

  return (
    <RepoContainer>
      <a href={html_url}>{full_name}</a>
      <StarContainer>
        <AiOutlineStar />
        <span>{stargazers_count}</span>
      </StarContainer>
      <p>{description}</p>
    </RepoContainer>
  );
}
