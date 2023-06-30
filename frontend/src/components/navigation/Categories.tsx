import styled from "styled-components";
import { useRecoilValue } from "recoil";
import CarsPerCategoryState from "../../states/menu/CarsPerCategoryState";
import Category from "./Category";

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-right: 0.5px solid #767676;
  cursor: pointer;
`;

export default () => {
  const carCategoryCars = useRecoilValue(CarsPerCategoryState);

  return (
    <Categories>
      {carCategoryCars.map((category) => {
        return <Category category={category} key={category.categoryId} />;
      })}
    </Categories>
  );
};
