import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";

const StyledInput = styled.input`
  height: 40px;
  width: 500px;
  padding: 5px;
  padding-left: 30px;
  border: 2px solid #eee;
  border-radius: 25px;
  font-size: 20px;
  background-color: #f3f3f3;

  ::placeholder {
    color: #aaa;
  }
`;

function Input({ value, onChange }) {
  return (
    <StyledInput
      value={value}
      onChange={onChange}
      placeholder="search github repos"
    />
  );
}

export default Input;
