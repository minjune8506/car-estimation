import { useRecoilState } from "recoil";
import styled from "styled-components";
import FocusedCarCategoryState from "../../states/home/SelectedCarCategory";
import { CarCategory } from "../../types/CarCategory";
import { AiOutlineRight } from "react-icons/ai";

const Category = styled.div<{ isMouseOver: boolean }>`
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

interface CategoryProps {
  category: CarCategory;
}

export default ({ category }: CategoryProps) => {
  const [focusedCarCategory, setFocusedCarCategory] = useRecoilState(
    FocusedCarCategoryState
  );
  return (
    <>
      <Category
        isMouseOver={category.categoryId === focusedCarCategory}
        onMouseOver={() => setFocusedCarCategory(category.categoryId)}
      >
        {category.categoryName}
        <Arrow isMouseOver={category.categoryId === focusedCarCategory}>
          <AiOutlineRight />
        </Arrow>
      </Category>
    </>
  );
};
