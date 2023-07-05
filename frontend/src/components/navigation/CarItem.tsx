import styled from "styled-components";
import { Car } from "../../types/Car";
import { convertPrice } from "../../common/utils/price_utils";
import { ReactNode } from "react";

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

const CarCard = styled.div<{
  hoverBackgrond?: string;
  width?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  &:hover {
    background-color: ${(props) => props.hoverBackgrond};
  }
`;

interface CarItemCardProps {
  car: Car;
  isHover?: boolean;
  children?: ReactNode;
  onMouseOver?: (id: number) => void;
  onMouseLeave?: () => void;
  hoverBackground?: string;
  width?: string;
  height?: string;
}

export default function CarItemCard({
  car,
  isHover,
  children,
  onMouseOver,
  onMouseLeave,
  hoverBackground,
  width,
  height,
}: CarItemCardProps) {
  return (
    <CarCard
      onMouseOver={() => onMouseOver && onMouseOver(car.carId)}
      onMouseLeave={onMouseLeave}
      hoverBackgrond={hoverBackground}
      width={width}
      height={height}
    >
      <img
        className="object-contain"
        src={`/images/${car.carImg}`}
        alt={`${car.carName} 차량 이미지`}
      ></img>
      <CarName>{car.carName}</CarName>
      <Price>{convertPrice(car.lowPrice, 10000) + "만원~"}</Price>
      {isHover && children}
    </CarCard>
  );
}
