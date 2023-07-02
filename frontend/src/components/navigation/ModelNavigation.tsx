import styled from "styled-components";
import useCarsPerCategory from "../../hooks/queries/menu/useCarsPerCategory";
import Cars from "./Cars";
import Categories from "./Categories";

const Wrapper = styled.div`
  display: flex;
  height: 30rem;
`;

function ModelNavigation() {
  const { isLoading, isError, error, data } = useCarsPerCategory();

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>{`오류가 발생했습니다. : ${error}`}</div>;

  return (
    <Wrapper>
      <Categories carsPerCategory={data} />
      <Cars carsPerCategory={data} />
    </Wrapper>
  );
}

export default ModelNavigation;
