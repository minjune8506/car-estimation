import styled from "styled-components";
import useCarsPerCategory from "../../hooks/queries/menu/useCategoryCars";
import Cars from "./Cars";
import Categories from "./Categories";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import FocusedCarCategoryState from "../../states/home/SelectedCarCategory";

const Wrapper = styled.div`
  display: flex;
  height: 30rem;
`;

function ModelNavigation() {
  const { isLoading, isError, isSuccess, error, data } = useCarsPerCategory();
  const setFocusedCarCategory = useSetRecoilState(FocusedCarCategoryState);

  useEffect(() => {
    if (isSuccess && data) {
      setFocusedCarCategory(data[0].categoryId);
    }
  }, [data]);

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
