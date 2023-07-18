import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useSetRecoilState } from "recoil";
import { CategoryCars } from "../../types/CarCategory";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CarItem from "./Car";
import { IsMainMenuOpen } from "src/states/HomeState";

const StyledCars = styled.ul`
  display: flex;
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
  selectedCategory?: number;
}

export default function Cars({ carsPerCategory, selectedCategory }: CarsProps) {
  const setIsMenuOpen = useSetRecoilState(IsMainMenuOpen);
  const [currentCar, setCurrentCar] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  const onCarItemMouseOver = (id: number) => {
    setCurrentCar(id);
  };

  const onCarItemMouseLeave = () => {
    setCurrentCar(undefined);
  };

  const navigateToModelSelect = (carId: number) => {
    navigate(`/estimation/model?carId=${carId}`);
    setIsMenuOpen(false);
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
      <StyledCars>
        {selectedCategory &&
          carsPerCategory
            .find((category) => category.categoryId === selectedCategory)
            ?.cars.map((car) => (
              <CarItem
                car={car}
                key={car.carId}
                hoverBackground="white"
                onMouseOver={onCarItemMouseOver}
                onMouseLeave={onCarItemMouseLeave}
                onClick={navigateToModelSelect}
                showChildren={car.carId === currentCar}
                width="200px"
                height="200px"
              >
                <StyledText>내 차 만들기</StyledText>
              </CarItem>
            ))}
      </StyledCars>
    </ItemsWrap>
  );
}
