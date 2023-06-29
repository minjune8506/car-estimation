import styled from "styled-components";
import { Car } from "./types";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { focusedCarState } from "../home/home_state";

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

function toPrice(price: number): string {
  const priceStr = price.toString();
  const koreanPrice = priceStr.substring(0, priceStr.length - 4);
  return koreanPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "만원~";
}

interface CarProps {
  car: Car;
}

function Car({ car }: CarProps) {
  const [focusedCar, setFocusedCar] = useRecoilState(focusedCarState);

  return (
    <CardLink
      to={`estimation/model`}
      onMouseOver={() => setFocusedCar(car.carId)}
      onMouseLeave={() => setFocusedCar(null)}
    >
      <img src={`src/assets/${car.carImg}`} alt="차량 이미지"></img>
      <CarName>{car.carName}</CarName>
      <Price>{toPrice(car.lowPrice)}</Price>
      <Navigation isMouseOver={focusedCar === car.carId}>
        내 차 만들기
      </Navigation>
    </CardLink>
  );
}

export default Car;
