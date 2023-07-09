import styled, { css } from "styled-components";
import { Option } from "types/Option";
import { IconContext } from "react-icons";
import { BsFillExclamationCircleFill as ExclamationCircle } from "react-icons/bs";
import {
  AiFillCheckCircle as CheckCircle,
  AiOutlinePlusCircle as PlusCircle,
} from "react-icons/ai";
import { convertPrice } from "common/utils/price-utils";

interface OptionCardsProps {
  options: Option[];
  title?: string;
  backgroundImg?: string;
}

function OptionCards({ options, title, backgroundImg }: OptionCardsProps) {
  return (
    <section>
      <Title backgroundImg={backgroundImg}>{title}</Title>
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

export default OptionCards;

interface OptionProps {
  option: Option;
  selected?: boolean;
}

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

const Title = styled.h3<{ backgroundImg?: string }>`
  font-size: large;
  font-weight: bold;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  ${(props) =>
    props.backgroundImg &&
    css`
      background: url(${props.backgroundImg}) no-repeat center;
      background-size: contain;
      width: 120px;
      height: 40px;
      color: none;
      text-indent: -9999px;
    `}
`;
