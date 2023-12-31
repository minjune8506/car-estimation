import { useState } from "react";
import styled, { keyframes } from "styled-components";
import Background from "/images/car/background.png";
import Avante from "/images/car/avante/avante.png";
import Tucson from "/images/car/tucson/tucson.png";
import LeftArrowImg from "/images/icon/arrow_left.svg";
import RightArrowImg from "/images/icon/arrow_right.svg";

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
];

const SliderContainer = styled.main<{ backgroundImg: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-image: url(${(props) => props.backgroundImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

export default function CarSlider() {
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
