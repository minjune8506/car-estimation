import styled from "styled-components";
import { CarInfo } from "./types";
import { Link } from "react-router-dom";

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

const Price = styled.div`
  color: gray;
  font-size: small;
  padding-bottom: 0.5rem;
`;

const CarName = styled.div`
  color: black;
  font-size: medium;
  font-weight: bold;
  padding-bottom: 0.5rem;
`;

const Navigation = styled.div<{ isMouseOver: boolean }>`
  color: #002c5f;
  font-size: small;
  font-weight: bold;
  display: ${(props) => (props.isMouseOver ? "block" : "none")};
`;

function toPrice(price: string): string {
  const koreanPrice = price.substring(0, price.length - 4);
  return koreanPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "만원~";
}

interface CarInfoProps {
  car: CarInfo;
  isMouseOver: boolean;
  onMouseOver: (carId: string) => void;
  onMouseLeave: () => void;
}

function Car({ car, isMouseOver, onMouseOver, onMouseLeave }: CarInfoProps) {
  return (
    <CardLink
      to={`estimation/model`}
      onMouseOver={() => onMouseOver(car.carId)}
      onMouseLeave={onMouseLeave}
    >
      <img src={`src/assets/car/${car.imgPath}`} alt="차량 이미지"></img>
      <CarName>{car.name}</CarName>
      <Price>{toPrice(car.lowPrice)}</Price>
      <Navigation isMouseOver={isMouseOver}>내 차 만들기</Navigation>
    </CardLink>
  );
}

export default Car;
