import styled from "styled-components";
import { convertPrice } from "common/utils/price-utils";
import Header from "src/components/estimation/Header";
import Colors from "components/estimation/car-making/Colors";
import { useLocation, useNavigate } from "react-router-dom";
import { useModelInfo } from "src/hooks/queries/model/Model";
import { useCarInfo } from "src/hooks/queries/car/Cars";
import { useEffect, useState } from "react";
import { useSpecsInfo } from "src/hooks/queries/spec/Spec";
import {
  ChangeExteriorColor,
  ChangeInteriorColor,
  ChangeModel,
  ConstraintCheck,
  SpecOption,
} from "src/types/Spec";
import { ExteriorColor, InteriorColor } from "src/types/Color";
import OptionCards from "src/components/estimation/car-making/OptionCards";
import ModelChangeModal from "src/components/estimation/car-making/ModelChangeModal";
import { getCarIdFrom, getModelIdFrom } from "src/common/utils/location-utils";
import { specAPI } from "src/hooks/queries/spec/api";
import {
  BASE_SPEC,
  OPTION_CATEGORY_TUIX,
} from "src/common/constants/constants";
import Modal from "src/components/common/Modal";
import OptionConstraintsModal from "src/components/estimation/car-making/OptionConstraintModal";
import useSelectedOptions from "src/hooks/estimation/useSelectedOptions";
import { useColors } from "src/hooks/estimation/useColors";
import usePrice from "src/hooks/estimation/usePrice";
import useModelOptions from "src/hooks/estimation/useModelOptions";
import useSpec from "src/hooks/estimation/useSpec";

interface Props {
  exteriorColor: ExteriorColor;
  interiorColor: InteriorColor;
  selectedOptions: SpecOption[];
}

export default function CarMaking() {
  // location data
  const location = useLocation();
  const state: Props = location.state;
  const carId = getCarIdFrom(location);
  const modelId = getModelIdFrom(location);

  const navigate = useNavigate();

  // state
  const [
    setModelOptions,
    findSpecInfo,
    findSpecDefaultOptions,
    getBasicOptions,
    getTuixOptions,
    getNPerformanceOptions,
  ] = useModelOptions();
  const [
    selectedOptions,
    initSelectedOptions,
    addOptions,
    deleteOptions,
    applyConstraint,
  ] = useSelectedOptions();
  const [spec, setSpec] = useSpec({
    findSpecInfo,
    addOptions,
    deleteOptions,
    findSpecDefaultOptions,
    selectedOptions,
  });
  const [
    exteriorColor,
    interiorColor,
    exteriorColors,
    interiorColors,
    colorChangeData,
    isCarImgExterior,
    changeExteriorColor,
    changeInteriorColor,
    onColorChange,
    setIsCarImgExterior,
    setColorChangeData,
  ] = useColors({ spec, setSpec, selectedOptions });

  const price = usePrice({ selectedOptions });
  const [selectedOption, setSelectedOption] = useState<SpecOption | undefined>(
    undefined
  );
  const [constraintCheck, setConstraintCheck] = useState<
    ConstraintCheck | undefined
  >(undefined);

  // data fetch
  const carInfoQuery = useCarInfo(carId);
  const modelInfoQuery = useModelInfo(modelId);
  const specsQuery = useSpecsInfo(modelId);

  // navigation props 초기값 설정
  useEffect(() => {
    if (state) {
      changeExteriorColor(state.exteriorColor);
      changeInteriorColor(state.interiorColor);
      initSelectedOptions(state.selectedOptions);
    }
  }, [modelId, state]);

  if (carInfoQuery.isLoading || modelInfoQuery.isLoading) {
    return <div>loading...</div>;
  }

  const onOptionClick = async (
    option: SpecOption,
    optionSpec: string,
    add?: boolean,
    enable?: boolean
  ) => {
    if (!enable) {
      if (option.optionCategoryId === OPTION_CATEGORY_TUIX) {
        return;
      }
      const checkConstraint = await specAPI.fetchOptionConstraintCheck(
        modelId,
        selectedOptions.map((selected) => selected.optionId),
        option.optionId
      );
      setSelectedOption(option);
      setConstraintCheck(checkConstraint);
      return;
    }

    if (optionSpec !== BASE_SPEC) {
      // 기본 스펙에 해당되는 옵션이 아닌 경우?
      // 외장 / 내장 색상이 유효한지 검사하고 유효하지 않으면 변경
      const data = specsQuery.data?.find((spec) =>
        add ? spec.specCode === optionSpec : spec.specCode === BASE_SPEC
      );
      if (!data) {
        return;
      }
      const found = data.colors.find(
        (color) =>
          color.exterior.id === exteriorColor!.id &&
          color.interior.id === interiorColor!.id
      );
      if (!found) {
        changeExteriorColor(data.colors[0].exterior);
        changeInteriorColor(data.colors[0].interior);
      }
    }
    const newSelectedOptions = add
      ? [...selectedOptions, option]
      : selectedOptions.filter(
          (selected) => selected.optionId !== option.optionId
        );
    applyConstraint(newSelectedOptions, specsQuery.data!, setModelOptions);
  };

  function onComplete() {
    navigate("/estimation/complete", {
      state: {
        selectedOptions,
        exteriorColor,
        interiorColor,
        modelInfo,
        carInfo,
      },
    });
  }

  const carInfo = carInfoQuery.data!;
  const modelInfo = modelInfoQuery.data!;
  const basicOptions = getBasicOptions();
  const tuixOptions = getTuixOptions();
  const nPerformanceOptions = getNPerformanceOptions();

  //   console.log("carInfo", carInfo);
  //   console.log("modelInfo", modelInfo);
  //   console.log("spec", spec);
  //   console.log("current exterior color", exteriorColor);
  //   console.log("exterior colors", exteriorColors);
  //   console.log("current interior color", interiorColor);
  //   console.log("interior colors", interiorColors);
  //   console.log("options", modelOptions);
  //   console.log("selected options", selectedOptions);
  //   console.log("total price", price);
  //   console.log("basic options", basicOptions);
  //   console.log("tuix options", tuixOptions);
  //   console.log("n performance options", nPerformanceOptions);

  return (
    <>
      <Header carId={carId} current="Car-Making" />
      <Main className="flex flex-row w-full">
        <CarSection>
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              {carInfo.carName} - {modelInfo.trimName}
            </h1>
            <span className="text-xs text-gray-500">{modelInfo.name}</span>
          </div>
          <div className="flex flex-row items-center">
            <span className="font-bold mr-8">총 차량 가격</span>
            <span className="text-2xl font-bold">{convertPrice(price)} 원</span>
          </div>
          <div className="w-full flex justify-center my-4">
            <img
              src={
                isCarImgExterior
                  ? `/images/car/${carInfo.carNameEn}/color/exterior/${exteriorColor?.code}/001.png`
                  : `/images/car/${carInfo.carNameEn}/color/interior/${interiorColor?.code}/img-interior.png`
              }
              alt={"차량 사진"}
              className="object-contain"
            />
          </div>
          <div className="flex justify-center">
            <StyledButton
              active={isCarImgExterior}
              onClick={() => setIsCarImgExterior(true)}
            >
              Exterior
            </StyledButton>
            <StyledButton
              active={!isCarImgExterior}
              onClick={() => setIsCarImgExterior(false)}
            >
              Interior
            </StyledButton>
          </div>
        </CarSection>
        <hr className="h-full border-gray-200 border-[0.5px]" />
        <OptionSection className="px-12">
          <h2 className="text-2xl font-bold my-6">색상</h2>
          {exteriorColor && exteriorColors && (
            <Colors
              title="외장 색상"
              selected={exteriorColor}
              colors={exteriorColors}
              carNameEn={carInfo.carNameEn}
              changeColor={onColorChange}
            ></Colors>
          )}
          <div className="my-6"></div>
          {interiorColor && interiorColors && (
            <Colors
              title="내장 색상"
              selected={interiorColor}
              colors={interiorColors}
              isInterior={true}
              carNameEn={carInfo.carNameEn}
              changeColor={onColorChange}
            ></Colors>
          )}
          <h2 className="text-2xl font-bold my-6">옵션</h2>
          <OptionCards
            options={basicOptions}
            selectedOptions={selectedOptions}
            carNameEn={carInfo.carNameEn}
            onOptionClick={onOptionClick}
          ></OptionCards>
          <OptionCards
            options={tuixOptions}
            selectedOptions={selectedOptions}
            carNameEn={carInfo.carNameEn}
            onOptionClick={onOptionClick}
            backgroundImg="/images/HGenuineAccessories.png"
            title="H Genuine Accessories"
          ></OptionCards>
          <OptionCards
            options={nPerformanceOptions}
            selectedOptions={selectedOptions}
            onOptionClick={onOptionClick}
            carNameEn={carInfo.carNameEn}
            backgroundImg="/images/NPerformance.png"
            title="N 퍼포먼스 파츠"
          ></OptionCards>
          <div className="flex items-center justify-center my-8">
            <button
              className="bg-[#002C5F] text-white text-sm py-3 px-6"
              onClick={onComplete}
            >
              내 차 만들기 완료
            </button>
          </div>
          &nbsp;
        </OptionSection>
        {colorChangeData &&
          (colorChangeData as ChangeExteriorColor).changeExteriorYn && (
            <Modal
              accept={true}
              onAccept={() => setColorChangeData(undefined)}
              acceptButtonText="확인"
            >
              <div>선택하신 내장색상과 함께 제공되지 않는 색상입니다.</div>
              <div>외장색상을 변경해주세요.</div>
            </Modal>
          )}
        {colorChangeData &&
          (colorChangeData as ChangeInteriorColor).changeInteriorYn && (
            <Modal
              accept={true}
              onAccept={() => setColorChangeData(undefined)}
              acceptButtonText="확인"
            >
              <div>선택하신 외장색상과 함께 제공되지 않는 색상입니다.</div>
              <div>내장색상을 변경해주세요.</div>
            </Modal>
          )}
        {colorChangeData && (colorChangeData as ChangeModel).modelInfo && (
          <ModelChangeModal
            carNameEn={carInfo.carNameEn}
            beforeModel={modelInfo}
            data={colorChangeData as ChangeModel}
            currentPrice={price}
            selectedOption={selectedOptions}
            cancel={() => setColorChangeData(undefined)}
          ></ModelChangeModal>
        )}
        {constraintCheck && selectedOption && (
          <OptionConstraintsModal
            carNameEn={carInfo.carNameEn}
            data={constraintCheck}
            targetOption={selectedOption}
            selectedOptions={selectedOptions}
            modelOptions={specsQuery.data!}
            setModelOptions={setModelOptions}
            setConstraintCheck={setConstraintCheck}
            setTargetOption={setSelectedOption}
            applyConstraint={applyConstraint}
          ></OptionConstraintsModal>
        )}
      </Main>
    </>
  );
}

/** styles */

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const CarSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 33%;
  padding: 1.5rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const OptionSection = styled.section`
  padding: 0 3rem;
  width: 1200px;

  @media (max-width: 1024px) {
    overflow-y: visible;
    width: 100%;
  }
`;

const StyledButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 2rem;
  font-size: small;
  text-align: center;

  background-color: ${(props) => (props.active ? "#007FA8" : "#E4DCD3")};
  color: ${(props) => (props.active ? "white" : "black")};
`;
