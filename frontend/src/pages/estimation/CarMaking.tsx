import styled from "styled-components";
import { convertPrice } from "common/utils/price-utils";
import Header from "src/components/estimation/Header";
import Colors from "components/estimation/car-making/Colors";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useModelExteriorColors,
  useModelInfo,
  useModelInteriorColors,
} from "src/hooks/queries/model/Model";
import { useCarColors, useCarInfo } from "src/hooks/queries/car/Cars";
import { useEffect, useState } from "react";
import { useSpec, useSpecCheck, useSpecs } from "src/hooks/queries/spec/Spec";
import {
  Action,
  ChangeExteriorColor,
  ChangeInteriorColor,
  ChangeModel,
  CheckSpecFail,
  ConstraintCheck,
  SpecOption,
  SpecOptionConstraint,
} from "src/types/Spec";
import { Color, ExteriorColor, InteriorColor } from "src/types/Color";
import OptionCards from "src/components/estimation/car-making/OptionCards";
import { ModelOptions } from "src/types/Model";
import ModelChangeModal from "src/components/estimation/car-making/ModelChangeModal";
import { getCarIdFrom, getModelIdFrom } from "src/common/utils/location-utils";
import { specAPI } from "src/hooks/queries/spec/api";
import {
  BASE_SPEC,
  OPTION_CATEGORY_TUIX,
  OPTION_CATEGORY_PACKAGE,
} from "src/common/constants/constants";
import Modal from "src/components/common/Modal";
import OptionConstraintsModal from "src/components/estimation/car-making/OptionConstraintModal";

interface Props {
  exteriorColor: ExteriorColor;
  interiorColor: InteriorColor;
  selectedOptions: SpecOption[];
}

export default function CarMaking() {
  const state: Props = useLocation().state;
  const navigate = useNavigate();

  // state
  const [price, setPrice] = useState(0);
  const [spec, setSpec] = useState<string>(BASE_SPEC);
  const [interiorColor, setInteriorColor] = useState<InteriorColor | undefined>(
    undefined
  );
  const [exteriorColor, setExteriorColor] = useState<ExteriorColor | undefined>(
    undefined
  );
  const [interiorColors, setInteriorColors] = useState<InteriorColor[]>([]);
  const [exteriorColors, setExteriorColors] = useState<ExteriorColor[]>([]);
  const [options, setOptions] = useState<ModelOptions[]>([]);
  const [selectedOption, setSelectedOption] = useState<SpecOption | undefined>(
    undefined
  );
  const [selectedOptions, setSelectedOptions] = useState<SpecOption[]>([]);
  const [isCarImgExterior, setIsCarImgExterior] = useState<boolean>(true);
  const [colorChangeData, setColorChangeData] = useState<
    ChangeModel | ChangeExteriorColor | ChangeInteriorColor | undefined
  >(undefined);
  const [constraintCheck, setConstraintCheck] = useState<
    ConstraintCheck | undefined
  >(undefined);

  // query string parse
  const location = useLocation();
  const carId = getCarIdFrom(location);
  const modelId = getModelIdFrom(location);

  // data fetch
  const carInfoQuery = useCarInfo(carId);
  const modelInfoQuery = useModelInfo(modelId);
  const carColorsQuery = useCarColors(carId, modelId);
  const modelExteriorsQuery = useModelExteriorColors(
    modelId,
    interiorColor?.id
  );
  const modelInteriorsQuery = useModelInteriorColors(
    modelId,
    exteriorColor?.id
  );
  const specsQuery = useSpecs(modelId);
  const specQuery = useSpec(spec, modelId);
  const specCheckQuery = useSpecCheck(
    modelId,
    spec,
    interiorColor?.id,
    exteriorColor?.id
  );

  // navigation props 초기값 설정
  useEffect(() => {
    if (state) {
      setExteriorColor(state.exteriorColor);
      setInteriorColor(state.interiorColor);
      setSelectedOptions(state.selectedOptions);
    }
  }, [modelId, state]);

  // 선택한 외장 / 내장 초기값 설정, 옵션 초기값 설정
  useEffect(() => {
    if (specsQuery.data) {
      const initialColor = specsQuery.data[0].colors[0];
      exteriorColor || setExteriorColor(initialColor.exterior);
      interiorColor || setInteriorColor(initialColor.interior);
      console.log("specsQuery useEffect", exteriorColor, interiorColor);
      setOptions(specsQuery.data);
    }
  }, [specsQuery.data]);

  // 선택된 옵션 변경시 가격 정보 설정
  useEffect(() => {
    if (modelInfoQuery.data) {
      setPrice(
        selectedOptions.reduce(
          (acc, cur) => acc + cur.price,
          modelInfoQuery.data.price
        )
      );
    }
  }, [selectedOptions, modelInfoQuery.data]);

  // price 초기값 설정
  useEffect(() => {
    if (modelInfoQuery.data && !price) {
      setPrice(modelInfoQuery.data.price);
    }
  }, [modelInfoQuery.data]);

  // 내장 / 외장 색상 초기값 설정
  useEffect(() => {
    if (carColorsQuery.data) {
      setExteriorColors(carColorsQuery.data.exteriorColors);
      setInteriorColors(carColorsQuery.data.interiorColors);
    }
  }, [carColorsQuery.data]);

  // 내장 색상 변경시 외장 색상 설정
  useEffect(() => {
    if (modelExteriorsQuery.data) {
      setExteriorColors(modelExteriorsQuery.data);
    }
  }, [modelExteriorsQuery.data]);

  // 외장 색상 변경시 내장 색상 설정
  useEffect(() => {
    if (modelInteriorsQuery.data) {
      setInteriorColors(modelInteriorsQuery.data);
    }
  }, [modelInteriorsQuery.data]);

  // 내장 / 외장 색상 변경시 spec check
  // 현재 스펙에서 선택 불가능한 색상이면 spec 변경
  useEffect(() => {
    if (specCheckQuery.data) {
      if (specCheckQuery.data.available === "N") {
        const data = specCheckQuery.data as CheckSpecFail;
        setSpec(data.specCode);
      }
    }
  }, [interiorColor, exteriorColor, specCheckQuery.data]);

  // spec 변경시
  useEffect(() => {
    if (spec && modelInfoQuery.data && options) {
      const specInfo = options.find((specInfo) => specInfo.specCode === spec)!;
      console.log("spec info", specInfo);

      if (spec === BASE_SPEC) {
        const filtered = selectedOptions.filter((selectedOption) =>
          specInfo.options.find(
            (option) => option.optionId === selectedOption.optionId
          )
        );
        console.log("spec useeffect filtered", filtered);
        setSelectedOptions([...filtered]);
        return;
      }

      const defaultOptions = specInfo.options
        .filter((specOption) => specOption.defaultYn === "Y")
        .filter(
          (defaultOption) =>
            !selectedOptions.find(
              (selected) => selected.optionId === defaultOption.optionId
            )
        );
      setSelectedOptions([...selectedOptions, ...defaultOptions]);
    }
  }, [spec, modelInfoQuery.data]);

  // option 변경시 (ADD, DELETE, ENABLE, DISABLE)
  // selected option에서 변경된 데이터 제거
  useEffect(() => {
    const filtered = selectedOptions.filter((selectedOption) => {
      const specOptions = options.flatMap((spec) => spec.options);
      const found = specOptions.find(
        (specOption) => specOption.optionId === selectedOption.optionId
      );
      if (!found) return false;
      if (found && found.enable === "N") return false;
      return true;
    });
    console.log("filtered", filtered);
    setSelectedOptions([...filtered]);
  }, [options]);

  if (
    carInfoQuery.isLoading ||
    modelInfoQuery.isLoading ||
    specsQuery.isLoading
  ) {
    return <div>loading...</div>;
  }

  const onColorChange = async (color: Color, isInterior?: boolean) => {
    if (!color.choiceYn) {
      const colorChangeData = await specAPI.fetchColorChange(
        modelId,
        exteriorColor!.id,
        isInterior ? exteriorColor!.id : color.id,
        interiorColor!.id,
        isInterior ? color.id : interiorColor!.id,
        selectedOptions.map((selected) => selected.optionId)
      );
      setColorChangeData(colorChangeData);
      return;
    }
    isInterior ? setInteriorColor(color) : setExteriorColor(color);
    isInterior ? setIsCarImgExterior(false) : setIsCarImgExterior(true);
  };

  const applyConstraint = (
    constraints: SpecOptionConstraint[],
    add?: boolean
  ) => {
    const optionsClone: ModelOptions[] = JSON.parse(JSON.stringify(options));
    console.log("apply constraints", optionsClone);

    constraints.forEach((constraint) => {
      const constraintSpec = optionsClone.find(
        (spec) => spec.specCode === BASE_SPEC
      )!;

      if (
        (constraint.action === Action.ADD && add) ||
        (constraint.action === Action.DELETE && !add)
      ) {
        constraintSpec.options = [
          ...constraintSpec.options,
          { ...constraint.option, enable: "Y" },
        ];
      } else if (
        (constraint.action === Action.DELETE && add) ||
        (constraint.action === Action.ADD && !add)
      ) {
        constraintSpec.options = constraintSpec.options.filter(
          (option) => option.optionId !== constraint.option.optionId
        );
      } else if (
        (constraint.action === Action.ENABLE && add) ||
        (constraint.action === Action.DISABLE && !add)
      ) {
        constraintSpec.options = constraintSpec.options.map((option) => {
          if (option.optionId === constraint.option.optionId) {
            option.enable = "Y";
          }
          return option;
        });
      } else if (
        (constraint.action === Action.DISABLE && add) ||
        (constraint.action === Action.ENABLE && !add)
      ) {
        constraintSpec.options = constraintSpec.options.map((option) => {
          if (option.optionId === constraint.option.optionId) {
            option.enable = "N";
          }
          return option;
        });
      }
    });
    console.log("apply constraints", optionsClone);

    setOptions(optionsClone);
  };

  const onOptionClick = async (
    option: SpecOption,
    optionSpec: string,
    add?: boolean,
    enable?: boolean
  ) => {
    if (!enable) {
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
        setExteriorColor(data.colors[0].exterior);
        setInteriorColor(data.colors[0].interior);
      }
    }
    add
      ? setSelectedOptions([...selectedOptions, option])
      : setSelectedOptions(
          selectedOptions.filter(
            (selectedOption) => selectedOption.optionId !== option.optionId
          )
        );

    const constraints = await specAPI.fetchOptionConstraints(
      modelId,
      optionSpec,
      option.optionId
    );
    console.log("constraints", constraints);
    applyConstraint(constraints, add);
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
  const basicOptions = options.map((spec) => ({
    ...spec,
    options: spec.options.filter(
      (specOption) => specOption.optionCategoryId === OPTION_CATEGORY_PACKAGE
    ),
  }));
  const tuixOptions = options.map((spec) => ({
    ...spec,
    options: spec.options.filter(
      (specOption) =>
        specOption.optionCategoryId === OPTION_CATEGORY_TUIX &&
        !specOption.optionName.includes("[N퍼포먼스]")
    ),
  }));
  const nPerformanceOptions = options.map((spec) => ({
    ...spec,
    options: spec.options.filter(
      (specOption) =>
        specOption.optionCategoryId === OPTION_CATEGORY_TUIX &&
        specOption.optionName.includes("[N퍼포먼스]")
    ),
  }));

  console.log("carInfo", carInfo);
  console.log("modelInfo", modelInfo);
  console.log("spec", spec);
  console.log("current exterior color", exteriorColor);
  console.log("exterior colors", exteriorColors);
  console.log("current interior color", interiorColor);
  console.log("interior colors", interiorColors);
  console.log("options", options);
  console.log("selected options", selectedOptions);
  console.log("total price", price);
  console.log("basic options", basicOptions);
  console.log("tuix options", tuixOptions);
  console.log("n performance options", nPerformanceOptions);

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
        {constraintCheck && prevSelectOption && (
          <OptionConstraintsModal
            carNameEn={carInfo.carNameEn}
            data={constraintCheck}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setConstraintCheck={setConstraintCheck}
            targetOption={prevSelectOption}
            setTargetOption={setPrevSelectOption}
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
