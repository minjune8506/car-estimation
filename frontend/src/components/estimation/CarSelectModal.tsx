import styled from "styled-components";
import useCarsPerCategory from "../../hooks/queries/menu/useCarsPerCategory";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SelectedCategoryState from "../../states/model-select/SelectedCategoryState";
import IsSelectModalOpenState from "../../states/model-select/IsSelectModalOpenState";
import CategoryList from "./CategoryList";
import CarList from "./CarList";

const CarSelectModal = styled.div<{ isSelectModalOpen: boolean }>`
  display: ${(props) => (props.isSelectModalOpen ? "block" : "none")};
`;

export default () => {
  const { isSuccess, isLoading, isError, error, data } = useCarsPerCategory();
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    SelectedCategoryState
  );
  const isSelectModalOpen = useRecoilValue(IsSelectModalOpenState);

  useEffect(() => {
    if (isSuccess && data.length) {
      setSelectedCategory(data[0].categoryId);
    }
  }, [data]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (isError) {
    return <div>{`오류 발생 ${error}`}</div>;
  }

  return (
    <CarSelectModal
      isSelectModalOpen={isSelectModalOpen}
      className="flex flex-col w-full bg-white"
    >
      <CategoryList categories={data} />
      {selectedCategory && (
        <CarList
          cars={
            data.find((category) => category.categoryId === selectedCategory)
              ?.cars ?? []
          }
        />
      )}
    </CarSelectModal>
  );
};
