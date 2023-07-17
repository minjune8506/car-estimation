import { useQuery } from "@tanstack/react-query";
import {
  CheckSpec,
  CheckSpecFail,
  SpecColorChangeFail,
  SpecColorChangeSuccess,
  SpecInfo,
  SpecOptionConstraint,
} from "src/types/Spec";
import { SpecKeys } from "../queryKeys";
import { specAPI } from "./api";

export function useSpecs(modelId: number) {
  return useQuery<SpecInfo[], Error>({
    queryKey: SpecKeys.modelSpecs(modelId),
    queryFn: async () => {
      const data = specAPI.fetchSpecs(modelId);
      return data;
    },
    select: (data: SpecInfo[]) =>
      data.map((spec) => ({
        ...spec,
        options: spec.options.map((option) => ({
          ...option,
          enable: option.unityChoiceYn,
        })),
      })),
  });
}

export function useSpec(specCode: string, modelId: number) {
  return useQuery<SpecInfo, Error>({
    queryKey: SpecKeys.findByCode(specCode, modelId),
    queryFn: async () => {
      const data = specAPI.fetchSpec(specCode!, modelId);
      return data;
    },
  });
}

export function useSpecCheck(
  modelId: number,
  specCode: string,
  interiorColorId?: number,
  exteriorColorId?: number
) {
  return useQuery<CheckSpec | CheckSpecFail, Error>({
    queryKey: SpecKeys.check(
      modelId,
      specCode,
      interiorColorId,
      exteriorColorId
    ),
    queryFn: async () => {
      const data = specAPI.fetchSpecCheck(
        modelId,
        specCode,
        interiorColorId,
        exteriorColorId
      );
      return data;
    },
    enabled: !!specCode && !!interiorColorId && !!exteriorColorId,
  });
}

export function useSpecOptionConstraints(
  modelId: number,
  specCode: string,
  optoinId: number
) {
  return useQuery<SpecOptionConstraint[], Error>({
    queryKey: SpecKeys.optionConstraints(modelId, specCode, optoinId),
    queryFn: async () => {
      const data = specAPI.fetchOptionConstraints(modelId, specCode, optoinId);
      return data;
    },
  });
}

export function useSpecColorChange(
  modelId: number,
  afterExteriorColorId: number,
  afterInteriorColorId: number,
  options: number[]
) {
  return useQuery<SpecColorChangeFail | SpecColorChangeSuccess, Error>({
    queryKey: SpecKeys.changeColor(
      modelId,
      afterExteriorColorId,
      afterInteriorColorId,
      options
    ),
    queryFn: async () => {
      const data = specAPI.fetchColorChange(
        modelId,
        afterExteriorColorId,
        afterInteriorColorId,
        options
      );
      return data;
    },
    enabled: false,
  });
}
