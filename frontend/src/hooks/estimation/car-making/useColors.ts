import { useEffect, useState } from "react";
import { Color, ExteriorColor, InteriorColor } from "src/types/Color";
import { useCarColors } from "../../queries/car/Cars";
import { useLocation } from "react-router-dom";
import { getCarIdFrom, getModelIdFrom } from "src/common/utils/location-utils";
import {
  useModelExteriorColors,
  useModelInteriorColors,
} from "../../queries/model/Model";
import { useSpecCheck, useSpecsInfo } from "../../queries/spec/Spec";
import {
  ChangeExteriorColor,
  ChangeInteriorColor,
  ChangeModel,
  CheckSpecFail,
  SpecOption,
} from "src/types/Spec";
import { specAPI } from "../../queries/spec/api";
import { CarMakingProps } from "src/pages/estimation/CarMaking";

interface Props {
  spec: string;
  setSpec: (spec: string) => void;
  selectedOptions: SpecOption[];
  state: CarMakingProps;
}

export function useColors({ spec, setSpec, selectedOptions, state }: Props) {
  const [interiorColor, setInteriorColor] = useState<InteriorColor | undefined>(
    undefined
  );
  const [exteriorColor, setExteriorColor] = useState<ExteriorColor | undefined>(
    undefined
  );
  const [interiorColors, setInteriorColors] = useState<InteriorColor[]>([]);
  const [exteriorColors, setExteriorColors] = useState<ExteriorColor[]>([]);
  const [colorChangeData, setColorChangeData] = useState<
    ChangeModel | ChangeExteriorColor | ChangeInteriorColor | undefined
  >(undefined);
  const [isCarImgExterior, setIsCarImgExterior] = useState<boolean>(true);

  const location = useLocation();
  const carId = getCarIdFrom(location);
  const modelId = getModelIdFrom(location);

  const carColorsQuery = useCarColors(carId, modelId);
  const modelExteriorsQuery = useModelExteriorColors(
    modelId,
    interiorColor?.id
  );
  const modelInteriorsQuery = useModelInteriorColors(
    modelId,
    exteriorColor?.id
  );
  const specsQuery = useSpecsInfo(modelId);
  const specCheckQuery = useSpecCheck(
    modelId,
    spec,
    interiorColor?.id,
    exteriorColor?.id
  );

  useEffect(() => {
    if (specsQuery.data && !state) {
      const initialColor = specsQuery.data[0].colors[0];
      setExteriorColor(initialColor.exterior);
      setInteriorColor(initialColor.interior);
    }
  }, [specsQuery.data, state]);

  useEffect(() => {
    if (carColorsQuery.data) {
      setExteriorColors(carColorsQuery.data.exteriorColors);
      setInteriorColors(carColorsQuery.data.interiorColors);
    }
  }, [carColorsQuery.data]);

  useEffect(() => {
    if (modelExteriorsQuery.data) {
      setExteriorColors(modelExteriorsQuery.data);
    }
  }, [modelExteriorsQuery.data]);

  useEffect(() => {
    if (modelInteriorsQuery.data) {
      setInteriorColors(modelInteriorsQuery.data);
    }
  }, [modelInteriorsQuery.data]);

  useEffect(() => {
    if (specCheckQuery.data) {
      if (specCheckQuery.data.available === "N") {
        const data = specCheckQuery.data as CheckSpecFail;
        setSpec(data.specCode);
      }
    }
  }, [interiorColor, exteriorColor, specCheckQuery.data]);

  const changeInteriorColor = (color: InteriorColor) => {
    setInteriorColor(color);
  };

  const changeExteriorColor = (color: ExteriorColor) => {
    setExteriorColor(color);
  };

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
    isInterior ? changeInteriorColor(color) : changeExteriorColor(color);
    isInterior ? setIsCarImgExterior(false) : setIsCarImgExterior(true);
  };

  return [
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
  ] as const;
}
