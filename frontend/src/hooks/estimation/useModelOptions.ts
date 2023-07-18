import { useCallback, useEffect, useState } from "react";
import { ModelOptions } from "src/types/Model";
import { useLocation } from "react-router-dom";
import { getModelIdFrom } from "src/common/utils/location-utils";
import {
  OPTION_CATEGORY_PACKAGE,
  OPTION_CATEGORY_TUIX,
} from "src/common/constants/constants";
import { useSpecsInfo } from "../queries/spec/Spec";

function useModelOptions() {
  const [modelOptions, setModelOptions] = useState<ModelOptions[]>([]);

  const location = useLocation();
  const modelId = getModelIdFrom(location);

  const specsQuery = useSpecsInfo(modelId);

  useEffect(() => {
    if (specsQuery.data) {
      setModelOptions(specsQuery.data);
    }
  }, [specsQuery.data]);

  const findSpecInfo = useCallback(
    (specCode: string) => {
      return modelOptions.find((specInfo) => specInfo.specCode === specCode);
    },
    [modelOptions]
  );

  const findSpecDefaultOptions = useCallback(
    (specInfo: ModelOptions) => {
      return specInfo.options.filter((option) => option.defaultYn === "Y");
    },
    [modelOptions]
  );

  const getBasicOptions = useCallback(() => {
    return modelOptions.map((spec) => ({
      ...spec,
      options: spec.options.filter(
        (specOption) => specOption.optionCategoryId === OPTION_CATEGORY_PACKAGE
      ),
    }));
  }, [modelOptions]);

  const getTuixOptions = useCallback(() => {
    return modelOptions.map((spec) => ({
      ...spec,
      options: spec.options.filter(
        (specOption) =>
          specOption.optionCategoryId === OPTION_CATEGORY_TUIX &&
          !specOption.optionName.includes("[N퍼포먼스]")
      ),
    }));
  }, [modelOptions]);

  const getNPerformanceOptions = useCallback(() => {
    return modelOptions.map((spec) => ({
      ...spec,
      options: spec.options.filter(
        (specOption) =>
          specOption.optionCategoryId === OPTION_CATEGORY_TUIX &&
          specOption.optionName.includes("[N퍼포먼스]")
      ),
    }));
  }, [modelOptions]);

  return [
    setModelOptions,
    findSpecInfo,
    findSpecDefaultOptions,
    getBasicOptions,
    getTuixOptions,
    getNPerformanceOptions,
  ] as const;
}

export default useModelOptions;
