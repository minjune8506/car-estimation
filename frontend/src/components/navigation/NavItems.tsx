import styled from "styled-components";
import Car from "./Car";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { CategoryInfo } from "./types";
import { useState } from "react";

const ItemsDiv = styled.ul`
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

interface NavItemsProps {
  current: string;
  responses: Array<CategoryInfo>;
  closeMenu: () => void;
}

function NavItems({ current, responses, closeMenu }: NavItemsProps) {
  const [currentCar, setCurrentCar] = useState<string | null>(null);

  const onMouseOver = (carId: string) => {
    setCurrentCar(carId);
  };

  const onMouseLeave = () => {
    setCurrentCar(null);
  };

  return (
    <ItemsWrap>
      <CloseButton>
        <CloseButtonImg onClick={closeMenu}>
          <IconContext.Provider
            value={{ style: { width: "20px", height: "20px" } }}
          >
            <AiOutlineClose />
          </IconContext.Provider>
        </CloseButtonImg>
      </CloseButton>
      <ItemsDiv>
        {responses
          .filter((response) => response.categoryId === current)[0]
          .car.map((c) => (
            <Car
              car={c}
              key={c.carId}
              isMouseOver={c.carId === currentCar}
              onMouseOver={onMouseOver}
              onMouseLeave={onMouseLeave}
            ></Car>
          ))}
      </ItemsDiv>
    </ItemsWrap>
  );
}

export default NavItems;
