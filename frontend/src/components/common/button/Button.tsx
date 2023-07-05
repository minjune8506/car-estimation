import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  border-collapse: collapse;
  cursor: pointer;
`;

export const SelectButton = styled(Button)<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? "#002C5F" : "#767676")};
  padding: 12px 0px;
`;

export const ModelSelectButton = styled(Button)<{ selected?: boolean }>`
  background-color: ${(props) => (props.selected ? "#007fa8" : "white")};
  color: ${(props) => (props.selected ? "white" : "gray")};
  border: ${(props) =>
    props.selected ? "1px solid #007fa8" : "1px solid gray"};
  font-size: x-small;

  &:disabled {
    color: #cccccc;
    cursor: not-allowed;
  }
`;
