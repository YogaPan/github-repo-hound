import styled from "styled-components";
import { AiOutlineWarning } from "react-icons/ai";

const ErrorDisplayContainer = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 40px;
`;

export default function ErrorDisplay({ error }) {
  return (
    <ErrorDisplayContainer>
      <AiOutlineWarning size={40} />
      <span>{error.message}</span>
    </ErrorDisplayContainer>
  );
}
