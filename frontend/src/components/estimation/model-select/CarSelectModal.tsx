import styled from "styled-components";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import CategoryList from "./CategoryList";
import CarList from "./CarList";
import { CategoryCars } from "../../../types/CarCategory";
import BackDrop from "../../common/BackDrop";
import SelectedCategory from "../../../states/model-select/SelectedCategory";
import IsSelectCarModalOpen from "../../../states/model-select/IsSelectCarModalOpen";
interface CarSelectModalProps {
  data: CategoryCars[];
  currentCarId: number;
}

export default ({ data, currentCarId }: CarSelectModalProps) => {
  const [selectedCategory, setSelectedCategory] =
    useRecoilState(SelectedCategory);
  const [isSelectModalOpen, setIsSelectModalOpen] =
    useRecoilState(IsSelectCarModalOpen);

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

const CarSelectModal = styled.div<{ isSelectModalOpen: boolean }>`
  display: ${(props) => (props.isSelectModalOpen ? "block" : "none")};
`;
