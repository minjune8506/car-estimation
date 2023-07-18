import { ReactNode, memo } from "react";
import { convertPrice } from "src/common/utils/price-utils";
import { Car } from "src/types/Car";
import styled from "styled-components";

interface Props {
  car: Car;
  children?: ReactNode;
  showChildren?: boolean;

  onMouseOver?: (id: number) => void;
  onMouseLeave?: () => void;
  onClick?: (carId: number) => void;

  hoverBackground?: string;
  height?: string;
  width?: string;
}
const MemoizedCarItem = memo(CarItem);

export default MemoizedCarItem;

export function CarItem({
  car,
  hoverBackground,
  onMouseOver,
  onMouseLeave,
  onClick,
  children,
  showChildren,
  height,
  width,
}: Props) {
  return (
    <CarItemDiv
      hoverBackground={hoverBackground}
      onMouseOver={() => onMouseOver && onMouseOver(car.carId)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick && onClick(car.carId)}
      height={height}
      width={width}
    >
      <img src={`/images/${car.carImg}`} />
      <CarName>{car.carName}</CarName>
      <Price>{convertPrice(car.lowPrice, 10000) + "만원~"}</Price>
      {showChildren && children}
    </CarItemDiv>
  );
}

const CarItemDiv = styled.div<{
  hoverBackground?: string;
  flexBasis?: string;
  width?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  cursor: pointer;

  height: ${(props) => props.height};
  width: ${(props) => props.width};

  &:hover {
    background-color: ${(props) => props.hoverBackground};
  }
`;

const CarName = styled.span`
  font-weight: bold;
  font-size: medium;
  margin: 5px 0;
`;

const Price = styled.div`
  color: grey;
  font-size: small;
`;
