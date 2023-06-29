import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  carCategoryCarsState,
  focusedCarCategoryState,
} from "../home/home_state";

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-right: 0.5px solid #767676;
  cursor: pointer;
`;

const CategoryItem = styled.div<{ isMouseOver: boolean }>`
  font-size: medium;
  font-weight: bold;
  padding: 1rem;
  color: ${(props) => (props.isMouseOver ? "#007FA8" : "black")};
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.div<{ isMouseOver: boolean }>`
  display: ${(props) => (props.isMouseOver ? "block" : "none")};
  color: ${(props) => (props.isMouseOver ? "#007FA8" : "none")};
`;

function CarCategory() {
  const [focusedCarCategory, setFocusedCarCategory] = useRecoilState(
    focusedCarCategoryState
  );
  const carCategoryCars = useRecoilValue(carCategoryCarsState);

  return (
    <CategoryWrapper>
      {carCategoryCars.map((category) => {
        return (
          <CategoryItem
            isMouseOver={category.categoryId === focusedCarCategory}
            onMouseOver={() => setFocusedCarCategory(category.categoryId)}
            key={category.categoryId}
          >
            {category.categoryName}
            <Arrow isMouseOver={category.categoryId === focusedCarCategory}>
              <AiOutlineRight />
            </Arrow>
          </CategoryItem>
        );
      })}
    </CategoryWrapper>
  );
}

export default CarCategory;
