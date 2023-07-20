import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CategoryList from "./CategoryList";
import CarList from "./CarList";
import { CategoryCars } from "../../../types/CarCategory";
import BackDrop from "../../common/BackDrop";
interface CarSelectModalProps {
  data: CategoryCars[];
  currentCarId: number;
  isOpen?: boolean;
  closeModal: (state: boolean) => void;
  onNavigateModelSelect: (carId: number) => void;
}

export default function CarSelectModal({
  data,
  currentCarId,
  isOpen,
  closeModal,
  onNavigateModelSelect,
}: CarSelectModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
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
      position="absolute"
      onClick={(e) => {
        if (e.target === outside.current) {
          closeModal(false);
        }
      }}
    >
      <StyledCarSelectModal
        isSelectModalOpen={isOpen}
        className="flex flex-col w-full bg-white"
      >
        <CategoryList
          categories={data}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory && (
          <CarList
            onNavigate={onNavigateModelSelect}
            cars={
              data.find((category) => category.categoryId === selectedCategory)
                ?.cars ?? []
            }
          />
        )}
      </StyledCarSelectModal>
    </BackDrop>
  );
}

const StyledCarSelectModal = styled.div<{ isSelectModalOpen?: boolean }>`
  display: ${(props) => (props.isSelectModalOpen ? "block" : "none")};
`;
