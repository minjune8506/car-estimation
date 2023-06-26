import styled from "styled-components";
import { CarInfo } from "./types";

const Card = styled.li`
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

const Navigation = styled.div`
  color: #002c5f;
  font-size: small;
  font-weight: bold;
`;

function toPrice(price: string): string {
  const koreanPrice = price.substring(0, price.length - 4);
  return koreanPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "만원~";
}

interface CarInfoProps {
  car: CarInfo;
}

function Car({ car }: CarInfoProps) {
  return (
    <Card>
      <img src={`src/assets/car/${car.imgPath}`} alt="차량 이미지"></img>
      <CarName>{car.name}</CarName>
      <Price>{toPrice(car.lowPrice)}</Price>
      <Navigation>내 차 만들기</Navigation>
    </Card>
  );
}

export default Car;
