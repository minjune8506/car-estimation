import { IconContext } from "react-icons";
import { BsFillExclamationCircleFill as ExclamationCircle } from "react-icons/bs";
import { AiFillCheckCircle as CheckCircle } from "react-icons/ai";
import styled, { css } from "styled-components";
import { Color } from "types/Color";

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

export default Colors;
