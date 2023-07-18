import styled from "styled-components";
import { CategoryCars } from "../../../types/CarCategory";

interface CategoryProps {
  category: CategoryCars;
  selectedCategory: number | undefined;
  setSelectedCategory: (categoryId: number) => void;
}

function Category({
  category,
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) {
  return (
    <CategoryButton
      isClicked={category.categoryId === selectedCategory}
      onClick={() => setSelectedCategory(category.categoryId)}
      className="flex items-center justify-center w-24 h-8 text-sm"
    >
      {category.categoryName}
    </CategoryButton>
  );
}

interface CategoryListProps {
  categories: CategoryCars[];
  selectedCategory: number | undefined;
  setSelectedCategory: (categoryId: number) => void;
}

export default ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryListProps) => {
  return (
    <ol className="flex flex-row py-2 px-2">
      {categories.map((category) => (
        <Category
          category={category}
          key={category.categoryId}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </ol>
  );
};

const CategoryButton = styled.button<{ isClicked: boolean }>`
  background-color: ${(props) => (props.isClicked ? "white" : "#444")};
  color: ${(props) => (props.isClicked ? "black" : "white")};
`;
