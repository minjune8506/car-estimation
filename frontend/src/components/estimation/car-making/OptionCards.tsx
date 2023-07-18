import styled, { css } from "styled-components";
import { IconContext } from "react-icons";
import { BsFillExclamationCircleFill as ExclamationCircle } from "react-icons/bs";
import {
  AiFillCheckCircle as CheckCircle,
  AiOutlinePlusCircle as PlusCircle,
} from "react-icons/ai";
import { convertPrice } from "common/utils/price-utils";
import { SpecOption } from "src/types/Spec";
import { ModelOptions } from "src/types/Model";
import { memo } from "react";

interface OptionCardsProps {
  options: ModelOptions[];
  selectedOptions: SpecOption[];
  title?: string;
  backgroundImg?: string;
  carNameEn: string;
  onOptionClick: (
    option: SpecOption,
    optionSpec: string,
    add?: boolean,
    enable?: boolean
  ) => void;
}

function OptionCards({
  options,
  selectedOptions,
  title,
  backgroundImg,
  carNameEn,
  onOptionClick,
}: OptionCardsProps) {
  if (options.flatMap((spec) => spec.options).length <= 0) {
    return;
  }

  return (
    <section>
      <Title backgroundImg={backgroundImg}>{title}</Title>
      <ul className="flex flex-row flex-wrap gap-4">
        {options.map((spec) =>
          spec.options.map((option) => {
            return (
              <OptionCard
                specCode={spec.specCode}
                option={option}
                onOptionClick={onOptionClick}
                carNameEn={carNameEn}
                selected={
                  selectedOptions.find(
                    (selected) => selected.optionId === option.optionId
                  )
                    ? true
                    : false
                }
                key={option.optionId}
              ></OptionCard>
            );
          })
        )}
      </ul>
    </section>
  );
}

export default memo(OptionCards);

interface OptionProps {
  option: SpecOption;
  selected?: boolean;
  carNameEn: string;
  specCode: string;
  onOptionClick: (
    option: SpecOption,
    optionSpec: string,
    add?: boolean,
    enable?: boolean
  ) => void;
}

function OptionCard({
  option,
  selected,
  carNameEn,
  specCode,
  onOptionClick,
}: OptionProps) {
  const isEnable = option.enable === "Y";
  return (
    <StyledOptionCard
      selected={selected}
      onClick={() =>
        selected
          ? onOptionClick(option, specCode, false, isEnable)
          : onOptionClick(option, specCode, true, isEnable)
      }
    >
      <OptionImageDiv disabled={!isEnable}>
        {!isEnable && (
          <div className="absolute">
            <IconContext.Provider value={{ color: "#dddddd", size: "25px" }}>
              <ExclamationCircle />
            </IconContext.Provider>
          </div>
        )}
        <img
          src={`/images/car/${carNameEn}/option/${option.img}`}
          className="object-cover w-full h-full"
        />
      </OptionImageDiv>
      <div className="flex flex-col p-2 w-full flex-grow items-start justify-between">
        <span className="font-semibold text-sm">
          {option.optionName.replace("[N퍼포먼스]", "")}
        </span>
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
  width: 200px;
  height: 225px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  border-width: ${(props) => (props.selected ? "2px" : "1px")};
  border-color: ${(props) => (props.selected ? "#00cbfe" : "gray")};

  @media (max-width: 1024px) {
    width: 180px;
    height: 200px;
  }
`;

const OptionImageDiv = styled.div<{ disabled?: boolean }>`
  height: 140px;
  object-fit: contain;
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
