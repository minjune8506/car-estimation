import styled from "styled-components";
import useCarsPerCategory from "../../hooks/queries/menu/useCategoryCars";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import SelectedCategoryState from "../../states/model-select/SelectedCategory";
import IsSelectModalOpenState from "../../states/model-select/IsSelectCarModalOpen";
import CategoryList from "./CategoryList";
import CarList from "./CarList";
import BackDrop from "../common/BackDrop";
import { CarsPerCategory } from "../../types/Car";

const CarSelectModal = styled.div<{ isSelectModalOpen: boolean }>`
  display: ${(props) => (props.isSelectModalOpen ? "block" : "none")};
`;

interface CarSelectModalProps {
  data: CarsPerCategory[];
  currentCarId: number;
}

export default ({ data, currentCarId }: CarSelectModalProps) => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    SelectedCategoryState
  );
  const [isSelectModalOpen, setIsSelectModalOpen] = useRecoilState(
    IsSelectModalOpenState
  );

  useEffect(() => {
    data.forEach((category) => {
      const found = category.cars.find((car) => car.carId === currentCarId);
      if (found) {
        setSelectedCategory(category.categoryId);
      }
    });
  }, [data]);

  const outside = useRef(null);

  return (
    <BackDrop
      ref={outside}
      onClick={(e) => {
        if (e.target === outside.current) {
          setIsSelectModalOpen(false);
        }
      }}
    >
      <CarSelectModal
        isSelectModalOpen={isSelectModalOpen}
        className="flex flex-col w-full bg-white"
      >
        <CategoryList categories={data} />
        {selectedCategory && (
          <CarList
            cars={
              data.find((category) => category.categoryId === selectedCategory)
                ?.cars ?? []
            }
          />
        )}
      </CarSelectModal>
    </BackDrop>
  );
};
