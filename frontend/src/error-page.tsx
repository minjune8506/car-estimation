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

function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Error>
      <ErrorText>에러가 발생했습니다.</ErrorText>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Error>
  );
}

export default ErrorPage;
