import styled from "styled-components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  color: #ccc;
  font-size: 50px;
  animation: App-logo-spin infinite 0.5s linear;
`;

export default function LoadingDisplay() {
  return (
    <LoadingContainer>
      <LoadingIcon />
    </LoadingContainer>
  );
}
