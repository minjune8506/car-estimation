import styled, { css } from "styled-components";
import { BsFillExclamationCircleFill as ExclamationCircle } from "react-icons/bs";
import { IconContext } from "react-icons";
import {
  AiFillCheckCircle as CheckCircle,
  AiOutlinePlusCircle as PlusCircle,
} from "react-icons/ai";
import { convertPrice } from "../../common/utils/price-utils";
import { Car } from "../../types/Car";
import { ModelTrim } from "../../types/ModelTrim";
import Header from "../../components/estimation/Header";

const Title = styled.span<{ size: "x-large" | "large" | "medium" }>`
  font-weight: bold;
  font-size: ${(props) => props.size};
`;

interface ColorProps {
  color: Color;
  isInterior?: boolean;
  isSelected?: boolean;
}

const StyledColor = styled.li<{ isInterior?: boolean }>`
  width: 85px;
  height: 85px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isInterior &&
    css`
      width: 100%;
      height: 75px;
    `}

  &:not(:last-child) {
    ${(props) =>
      props.isInterior
        ? css`
            margin-bottom: 1rem;
          `
        : css`
            margin-right: 1rem;ƒ
          `}
  }
`;

function Color({ color, isInterior, isSelected }: ColorProps) {
  return (
    <StyledColor isInterior={isInterior}>
      {color.choiceYn === "N" && (
        <button className="absolute">
          <IconContext.Provider value={{ color: "#dddddd", size: "25px" }}>
            <ExclamationCircle />
          </IconContext.Provider>
        </button>
      )}
      {isSelected && (
        <button className="absolute -top-1 -right-1">
          <IconContext.Provider
            value={{ style: { fill: "#00cbfe" }, size: "20px" }}
          >
            <CheckCircle />
          </IconContext.Provider>
        </button>
      )}
      <img src={color.img} className="w-full h-full object-cover" />
    </StyledColor>
  );
}

interface ColorsProps {
  title: string;
  selected: string;
  colors: Color[];
  isInterior?: boolean;
  positionRef?: React.RefObject<HTMLDivElement>;
}

const ColorsWrapper = styled.ul<{ isInterior?: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 1rem;

  ${(props) =>
    props.isInterior &&
    css`
      flex-direction: column;
    `}
`;

function Colors({
  title,
  selected,
  colors,
  isInterior,
  positionRef,
}: ColorsProps) {
  return (
    <section ref={positionRef}>
      <div className="flex flex-row justify-between items-center">
        <Title size="large">{title}</Title>
        <span className="text-gray-400 text-sm">{selected}</span>
      </div>
      <hr className="my-2" />
      <ColorsWrapper isInterior={isInterior}>
        {colors.map((color) => {
          return (
            <Color
              color={color}
              isInterior={isInterior}
              isSelected={color.id === 1}
              key={color.id}
            ></Color>
          );
        })}
      </ColorsWrapper>
    </section>
  );
}

interface OptionProps {
  option: Option;
  selected?: boolean;
}

const StyledOptionCard = styled.li<{
  selected?: boolean;
  isWide?: boolean;
}>`
  height: 225px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  flex-basis: 23%;
  border-width: ${(props) => (props.selected ? "2px" : "1px")};
  border-color: ${(props) => (props.selected ? "#00cbfe" : "gray")};
  margin: 1rem 0;
`;

const OptionImageDiv = styled.div<{ disabled?: boolean }>`
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: ${(props) => (props.disabled ? "#dddddd" : "white")};
`;

function OptionCard({ option, selected }: OptionProps) {
  return (
    <StyledOptionCard selected={selected}>
      <OptionImageDiv disabled={option.choiceYn === "N"}>
        {option.choiceYn === "N" && (
          <div className="absolute">
            <IconContext.Provider value={{ color: "#dddddd", size: "25px" }}>
              <ExclamationCircle />
            </IconContext.Provider>
          </div>
        )}
        <img src={option.img} className="object-cover w-full h-full" />
      </OptionImageDiv>
      <div className="flex flex-col p-2 w-full flex-grow items-start justify-between">
        <span className="font-semibold text-sm">{option.name}</span>
        <div className="flex flex-row justify-between w-full">
          <span className="text-xs">{convertPrice(option.price)} 원</span>
          {selected ? (
            <IconContext.Provider
              value={{ style: { fill: "#00cbfe" }, size: "20px" }}
            >
              <CheckCircle />
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ size: "20px" }}>
              <PlusCircle />
            </IconContext.Provider>
          )}
        </div>
      </div>
    </StyledOptionCard>
  );
}

interface OptionCardsProps {
  options: Option[];
}

function OptionCards({ options }: OptionCardsProps) {
  return (
    <section>
      <h3 className="text-lg font-bold">상세 품목</h3>
      <hr className="my-2" />
      <ul className="flex flex-row flex-wrap justify-between">
        {options.map((option) => (
          <OptionCard
            option={option}
            selected={option.id === 1}
            key={option.id}
          ></OptionCard>
        ))}
      </ul>
    </section>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const OptionSection = styled.section`
  padding: 0 3rem;
  overflow-y: scroll;
  width: 1200px;

  @media (max-width: 1024px) {
    overflow-y: visible;
    width: 100%;
  }
`;

export default function CarMaking() {
  return (
    <>
      <Header carId={1} current="Car-Making" />
      <Main className="flex flex-row w-full">
        <section className="flex flex-col p-8 grow">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {car.carName} - {model.trimName}
            </h1>
            <span className="text-xs text-gray-500">{model.basicInfo}</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="font-bold mr-8">총 차량 가격</span>
            <span className="text-2xl font-bold">
              {convertPrice(model.price)} 원
            </span>
          </div>
          <div className="w-full h-auto flex justify-center">
            <img src={car.carImg} />
          </div>
        </section>
        <hr className="h-full border-gray-200 border-[0.5px]" />
        <OptionSection className="px-12 overflow-y-scroll">
          <h2 className="text-2xl font-bold my-6">색상</h2>
          <Colors
            title="외장 색상"
            selected="아마존 그레이 메탈릭"
            colors={exteriorColors}
          ></Colors>
          <div className="my-6"></div>
          <Colors
            title="내장 색상"
            selected="블랙 모노톤"
            colors={interiorColors}
            isInterior={true}
          ></Colors>
          <h2 className="text-2xl font-bold my-6">옵션</h2>
          <OptionCards options={options}></OptionCards>
          <div className="flex items-center justify-center my-8">
            <button className="bg-[#002C5F] text-white text-sm py-3 px-6">
              내 차 만들기 완료
            </button>
          </div>
          &nbsp;
        </OptionSection>
      </Main>
    </>
  );
}

// mock data

const car: Car = {
  carId: 1,
  carName: "더 뉴 아반떼",
  lowPrice: 20000000,
  carImg: "/images/car/avante/avante.png",
};

const model: ModelTrim = {
  id: 1,
  trimName: "Smart",
  price: 20000000,
  basicInfo: "더 뉴 아반떼 자가용 가솔린 1.6 Smart A/T",
  modelImg: "/model.jpg",
  detailImgs: ["/model1.jpg", "/model2.jpg", "/model3.jpg"],
};

interface Option {
  id: number;
  name: string;
  price: number;
  img: string;
  choiceYn: "Y" | "N";
}

const options: Option[] = [
  {
    id: 1,
    name: "컨비니언스 I",
    price: 690000,
    img: "/fullautoaircon_s.jpg",
    choiceYn: "Y",
  },
  {
    id: 2,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
  {
    id: 3,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
  {
    id: 4,
    name: "컨비니언스 II",
    price: 800000,
    img: "/frontheatedseat_s.jpg",
    choiceYn: "N",
  },
];

interface Color {
  id: number;
  name: string;
  img: string;
  choiceYn: "Y" | "N";
  price: number;
}

const exteriorColors: Color[] = [
  {
    id: 1,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "Y",
    price: 0,
  },
  {
    id: 2,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "N",
    price: 0,
  },
  {
    id: 3,
    name: "아마존 그레이 메탈릭",
    img: "/colorchip-exterior.png",
    choiceYn: "Y",
    price: 0,
  },
];

const interiorColors: Color[] = [
  {
    id: 1,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "Y",
    price: 0,
  },
  {
    id: 2,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "N",
    price: 0,
  },
  {
    id: 3,
    name: "블랙 모노톤",
    img: "/colorchip-interior.png",
    choiceYn: "Y",
    price: 0,
  },
];
