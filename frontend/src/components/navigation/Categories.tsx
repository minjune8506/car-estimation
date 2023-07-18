import { CarCategory, CategoryCars } from "src/types/CarCategory";
import { AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import { memo } from "react";

interface CategoriesProps {
  carsPerCategory: CategoryCars[];
  selectedCategory: number | undefined;
  onMouseOver?: (id: number) => void;
}

export default function Categories({
  carsPerCategory,
  selectedCategory,
  onMouseOver,
}: CategoriesProps) {
  return (
    <StyledCategories>
      {carsPerCategory.map((category) => {
        return (
          <Category
            category={category}
            key={category.categoryId}
            onMouseOver={onMouseOver}
            focused={category.categoryId === selectedCategory}
          />
        );
      })}
    </StyledCategories>
  );
}

interface CategoryProps {
  category: CarCategory;
  focused?: boolean;
  onMouseOver?: (id: number) => void;
}

function Category({ category, focused, onMouseOver }: CategoryProps) {
  return (
    <>
      <StyledCategory
        onMouseOver={() => onMouseOver && onMouseOver(category.categoryId)}
        focused={focused}
      >
        {category.categoryName}
        <Arrow focused={focused}>
          <AiOutlineRight />
        </Arrow>
      </StyledCategory>
    </>
  );
}
memo(Category);

const StyledCategories = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  border-right: 0.5px solid #767676;
`;

const StyledCategory = styled.li<{ focused?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: medium;
  font-weight: bold;
  padding: 1rem;

  color: ${(props) => (props.focused ? "#007FA8" : "black")};
`;

const Arrow = styled.div<{ focused?: boolean }>`
  display: ${(props) => (props.focused ? "block" : "none")};
  color: ${(props) => (props.focused ? "#007FA8" : "none")};
`;
