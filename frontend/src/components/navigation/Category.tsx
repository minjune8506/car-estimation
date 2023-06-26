import styled from "styled-components";
import { AiOutlineRight } from "react-icons/ai";
import { CategoryInfo } from "./types";

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
  current: string;
  onMouseOver: (n: string) => void;
  responses: Array<CategoryInfo>;
}

function Category({ current, onMouseOver, responses }: CategoryProps) {
  return (
    <CategoryWrapper>
      {responses.map((response) => {
        return (
          <CategoryItem
            isMouseOver={response.categoryId === current}
            onMouseOver={() => onMouseOver(response.categoryId)}
            key={response.categoryId}
          >
            {response.categoryName}
            <Arrow isMouseOver={response.categoryId === current}>
              <AiOutlineRight />
            </Arrow>
          </CategoryItem>
        );
      })}
    </CategoryWrapper>
  );
}

export default Category;
