import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import { CategoryInfo } from "./types";
import { useRecoilState } from "recoil";
import { focusedCategoryState } from "../home/home_state";

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

interface CategoryProps {
  categories: CategoryInfo[];
}

function Category({ categories }: CategoryProps) {
  const [focusedCategory, setFocusedCategory] =
    useRecoilState(focusedCategoryState);

  return (
    <CategoryWrapper>
      {categories.map((category) => {
        return (
          <CategoryItem
            isMouseOver={category.categoryId === focusedCategory}
            onMouseOver={() => setFocusedCategory(category.categoryId)}
            key={category.categoryId}
          >
            {category.categoryName}
            <Arrow isMouseOver={category.categoryId === focusedCategory}>
              <AiOutlineRight />
            </Arrow>
          </CategoryItem>
        );
      })}
    </CategoryWrapper>
  );
}

export default Category;
