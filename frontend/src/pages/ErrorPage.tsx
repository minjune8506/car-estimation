import { useRouteError } from "react-router-dom";
import styled from "styled-components";

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ErrorText = styled.h1`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export default () => {
  const error: any = useRouteError();
  return (
    <Error>
      <ErrorText>오류가 발생했습니다.</ErrorText>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Error>
  );
};
