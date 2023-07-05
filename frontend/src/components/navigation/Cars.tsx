import styled from "styled-components";
import Car from "./Car";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import IsMainMenuOpenState from "../../states/home/IsMainMenuOpen";
import FocusedCarCategoryState from "../../states/home/SelectedCarCategory";
import { CategoryCars } from "../../types/CarCategory";

const Cars = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 2rem;
`;

const ItemsWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  flex-grow: 1;
  flex-wrap: wrap;
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const CloseButtonImg = styled.div`
  &:hover {
    transform: rotate(180deg);
    transition: 0.5s;
  }
`;

interface CarsProps {
  carsPerCategory: CategoryCars[];
}

export default ({ carsPerCategory }: CarsProps) => {
  const setIsMenuOpen = useSetRecoilState(IsMainMenuOpenState);
  const focusedCategory = useRecoilValue(FocusedCarCategoryState);

  return (
    <ItemsWrap>
      <CloseButton>
        <CloseButtonImg onClick={() => setIsMenuOpen(false)}>
          <IconContext.Provider
            value={{ style: { width: "20px", height: "20px" } }}
          >
            <AiOutlineClose />
          </IconContext.Provider>
        </CloseButtonImg>
      </CloseButton>
      <Cars>
        {focusedCategory &&
          carsPerCategory
            .filter((category) => category.categoryId === focusedCategory)[0]
            .cars.map((car) => <Car car={car} key={car.carId}></Car>)}
      </Cars>
    </ItemsWrap>
  );
};
