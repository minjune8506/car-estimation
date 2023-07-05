import styled from "styled-components";
import { CarCategory } from "../../types/CarCategory";

const Category = styled.div<{ isSelected?: boolean; selectedColor?: string }>`
  font-size: medium;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? props.selectedColor : "black")};
`;

interface CategoryProps {
  category: CarCategory;
  isSelected?: boolean;
  selectedColor?: string;
}

export default ({ category, isSelected, selectedColor }: CategoryProps) => {
  return (
    <Category isSelected={isSelected} selectedColor={selectedColor}>
      {category.categoryName}
    </Category>
  );
};
