import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import IsMainMenuOpenState from "../../states/home/IsMainMenuOpen";
import FocusedCarCategoryState from "../../states/home/SelectedCarCategory";
import { CategoryCars } from "../../types/CarCategory";
import { Link } from "react-router-dom";
import CarItem from "./CarItem";
import { useState } from "react";

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

const StyledText = styled.span`
  color: #002c5f;
  font-weight: bold;
  font-size: small;
  margin-top: 1rem;
`;

interface CarsProps {
  carsPerCategory: CategoryCars[];
}

export default ({ carsPerCategory }: CarsProps) => {
  const setIsMenuOpen = useSetRecoilState(IsMainMenuOpenState);
  const focusedCategory = useRecoilValue(FocusedCarCategoryState);
  const [selectedCar, setSelectedCar] = useState<undefined | number>(undefined);

  const onCarItemMouseOver = (id: number) => {
    setSelectedCar(id);
  };

  const onCarItemMouseLeave = () => {
    setSelectedCar(undefined);
  };

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
            .find((category) => category.categoryId === focusedCategory)
            ?.cars.map((car) => (
              <Link to={`estimation/model?carId=${car.carId}`}>
                <CarItem
                  car={car}
                  key={car.carId}
                  onMouseOver={onCarItemMouseOver}
                  onMouseLeave={onCarItemMouseLeave}
                  isHover={car.carId === selectedCar}
                  hoverBackground="white"
                  width="200px"
                  height="200px"
                >
                  <StyledText>내 차 만들기</StyledText>
                </CarItem>
              </Link>
            ))}
      </Cars>
    </ItemsWrap>
  );
};
