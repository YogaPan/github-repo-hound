import styled from "styled-components";

const NotFoundMessage = styled.span`
  font-size: 40px;
`;

export default function NotFoundDisplay() {
  return <NotFoundMessage>No repos found.</NotFoundMessage>;
}
