import styled from "styled-components";
import Cars from "./Cars";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import { useCategoryCars } from "src/hooks/queries/car/CategoryCars";

const Wrapper = styled.div`
  display: flex;
  height: 30rem;
`;

function ModelNavigation() {
  const { data } = useCategoryCars();
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      data.length && setSelectedCategory(data[0].categoryId);
    }
  }, [data]);

  const onCategoryMouseOver = (id: number) => {
    setSelectedCategory(id);
  };

  if (!data) return;

  return (
    <Wrapper>
      <Categories
        carsPerCategory={data}
        selectedCategory={selectedCategory}
        onMouseOver={onCategoryMouseOver}
      />
      <Cars carsPerCategory={data} selectedCategory={selectedCategory} />
    </Wrapper>
  );
}

export default ModelNavigation;
