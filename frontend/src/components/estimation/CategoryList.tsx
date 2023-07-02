import styled from "styled-components";
import { CarsPerCategory } from "../../types/Car";
import { useRecoilState } from "recoil";
import SelectedCategoryState from "../../states/model-select/SelectedCategoryState";

const CategoryButton = styled.button<{ isClicked: boolean }>`
  background-color: ${(props) => (props.isClicked ? "white" : "#444")};
  color: ${(props) => (props.isClicked ? "black" : "white")};
`;

interface CategoryProps {
  category: CarsPerCategory;
}

function Category({ category }: CategoryProps) {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    SelectedCategoryState
  );
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
  categories: CarsPerCategory[];
}

export default ({ categories }: CategoryListProps) => {
  return (
    <ol className="flex flex-row py-2 px-2">
      {categories.map((category) => (
        <Category category={category} key={category.categoryId} />
      ))}
    </ol>
  );
};
