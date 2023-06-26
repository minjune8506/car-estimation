import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Background from "../assets/car/background.png";
import Avante from "../assets/car/avante.png";
import Tucson from "../assets/car/tucson.png";
import LeftArrowImg from "../assets/icon/arrow_left.svg";
import RightArrowImg from "../assets/icon/arrow_right.svg";

const cars = [
  {
    id: 1,
    name: "더 뉴 아반떼",
    src: Avante,
  },
  {
    id: 2,
    name: "투싼",
    src: Tucson,
  },
  {
    id: 3,
    name: "더 뉴 아반떼",
    src: Avante,
  },
  {
    id: 4,
    name: "투싼",
    src: Tucson,
  },
];

const SliderContainer = styled.main<{ backgroundImg: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: no-repeat center url(${(props) => props.backgroundImg});
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const fade = keyframes`
	0% {
		opacity: 0.3;
	}

	100% {
		opacity: 1;
	}
`;

const Slide = styled.div<{ isCurrent: boolean }>`
  flex-grow: 1;
  display: ${(props) => (props.isCurrent ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  animation-name: ${fade};
  animation-duration: 1.5s;
  position: relative;
  top: 50px;
`;

const PrevButton = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
`;

const NextButton = styled.div`
  cursor: pointer;
  width: 48px;
  height: 48px;
`;

const CarName = styled.div.attrs({
  className: "text-5xl font-bold absolute top-5 left-5",
})``;

function CarBanner() {
  const [current, setCurrent] = useState(0);

  const showNext = () => {
    const next = (current + 1) % cars.length;
    setCurrent(next);
  };

  const showPrev = () => {
    const prev = current - 1 < 0 ? cars.length - 1 : current - 1;
    setCurrent(prev);
  };

  return (
    <SliderContainer backgroundImg={Background}>
      <PrevButton onClick={showPrev}>
        <img src={LeftArrowImg}></img>
      </PrevButton>

      {cars.map((car, idx) => (
        <Slide isCurrent={current === idx} key={car.id}>
          <CarName>{cars[current].name}</CarName>
          <img src={car.src} key={car.id} style={{ width: "1024px" }}></img>
        </Slide>
      ))}

      <NextButton onClick={showNext}>
        <img src={RightArrowImg}></img>
      </NextButton>
    </SliderContainer>
  );
}

export default CarBanner;
