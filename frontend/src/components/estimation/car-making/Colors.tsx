import { IconContext } from "react-icons";
import { BsFillExclamationCircleFill as ExclamationCircle } from "react-icons/bs";
import { AiFillCheckCircle as CheckCircle } from "react-icons/ai";
import styled, { css } from "styled-components";
import { Color } from "types/Color";
import { memo } from "react";

interface ColorProps {
  color: Color;
  carNameEn: string;
  isInterior?: boolean;
  isSelected?: boolean;
  changeColor: (color: Color, isInterior?: boolean) => void;
}

function Color({
  color,
  isInterior,
  isSelected,
  changeColor,
  carNameEn,
}: ColorProps) {
  return (
    <StyledColor
      isInterior={isInterior}
      title={color.name}
      onClick={() => changeColor(color, isInterior)}
    >
      {!color.choiceYn && (
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
      <img
        src={
          isInterior
            ? `/images/car/${carNameEn}/color/interior/${color.code}/${color.code}.png`
            : `/images/car/${carNameEn}/color/exterior/${color.code}/${color.code}.png`
        }
        alt={color.name}
        className="w-full h-full object-cover"
      />
    </StyledColor>
  );
}

interface ColorsProps {
  title: string;
  selected: Color;
  colors: Color[];
  isInterior?: boolean;
  positionRef?: React.RefObject<HTMLDivElement>;
  carNameEn: string;
  changeColor: (color: Color, isInterior?: boolean) => void;
}

function Colors({
  title,
  selected,
  colors,
  isInterior,
  carNameEn,
  positionRef,
  changeColor,
}: ColorsProps) {
  return (
    <section ref={positionRef}>
      <div className="flex flex-row justify-between items-center">
        <Title size="large">{title}</Title>
        <span className="text-gray-400 text-sm">{selected.name}</span>
      </div>
      <hr className="my-2" />
      <ColorsWrapper isInterior={isInterior}>
        {colors.map((color) => {
          return (
            <Color
              color={color}
              isInterior={isInterior}
              isSelected={selected.id === color.id}
              key={color.id}
              changeColor={changeColor}
              carNameEn={carNameEn}
            ></Color>
          );
        })}
      </ColorsWrapper>
    </section>
  );
}

export default memo(Colors);

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

const Title = styled.span<{ size: "x-large" | "large" | "medium" }>`
  font-weight: bold;
  font-size: ${(props) => props.size};
`;

const StyledColor = styled.li<{ isInterior?: boolean }>`
  width: 85px;
  height: 85px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

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
            margin-right: 1rem;
          `}
  }
`;
