import styled from "styled-components";
import { Car } from "../../types/Car";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import FocusedCarState from "../../states/menu/FocusedCarState";

const CarLink = styled(Link)`
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

const MakingCarLink = styled.div<{ isMouseOver: boolean }>`
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

export default ({ car }: CarProps) => {
  const [focusedCar, setFocusedCar] = useRecoilState(FocusedCarState);

  return (
    <CarLink
      to={`estimation/model`}
      onMouseOver={() => setFocusedCar(car.carId)}
      onMouseLeave={() => setFocusedCar(null)}
    >
      <img src={`/images/${car.carImg}`} alt="차량 이미지"></img>
      <CarName>{car.carName}</CarName>
      <Price>{toPrice(car.lowPrice)}</Price>
      <MakingCarLink isMouseOver={focusedCar === car.carId}>
        내 차 만들기
      </MakingCarLink>
    </CarLink>
  );
};
