import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";

export default () => {
  const error: any = useRouteError();
  const navigate = useNavigate();
  return (
    <Error>
      <ErrorText>오류가 발생했습니다.</ErrorText>
      <div className="flex flex-col items-center justify-center">
        <span>{error.errorCode}</span>
        <span>{error.statusText || error.message}</span>
      </div>
      <button
        className="px-4 py-2 my-4 bg-gray-500 text-white text-sm"
        onClick={() => navigate(-1)}
      >
        돌아가기
      </button>
    </Error>
  );
};

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
