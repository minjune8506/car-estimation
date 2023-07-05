import styled from "styled-components";
import Category from "./Category";
import { CategoryCars } from "../../types/CarCategory";

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-right: 0.5px solid #767676;
  cursor: pointer;
`;

interface CategoriesProps {
  carsPerCategory: CategoryCars[];
}

export default ({ carsPerCategory }: CategoriesProps) => {
  return (
    <Categories>
      {carsPerCategory.map((category) => {
        return <Category category={category} key={category.categoryId} />;
      })}
    </Categories>
  );
};
