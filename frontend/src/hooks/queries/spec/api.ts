import { customFetch } from "common/utils/customFetch";
import {
  CheckSpec,
  CheckSpecFail,
  SpecColorChangeFail,
  SpecColorChangeSuccess,
  SpecInfo,
  SpecOptionConstraint,
} from "types/Spec";

export const specAPI = {
  fetchSpecs: (modelId: number): Promise<SpecInfo[]> => {
    return customFetch(`/specs`, { method: "get", params: { modelId } });
  },
  fetchSpec: (specCode: string, modelId?: number): Promise<SpecInfo> => {
    return customFetch(`/specs/${specCode}`, {
      method: "get",
      params: { modelId },
    });
  },
  fetchSpecCheck: (
    modelId: number,
    specCode: string,
    interiorColorId?: number,
    exteriorColorId?: number
  ): Promise<CheckSpec | CheckSpecFail> => {
    return customFetch(`/specs/check`, {
      method: "get",
      params: { modelId, specCode, interiorColorId, exteriorColorId },
    });
  },
  fetchOptionConstraints: (
    modelId: number,
    specCode: string,
    optionId: number
  ): Promise<SpecOptionConstraint[]> => {
    return customFetch(`/specs/options/constraints`, {
      method: "get",
      params: { modelId, specCode, optionId },
    });
  },
  fetchColorChange: (
    modelId: number,
    exteriorColorId: number,
    interiorColorId: number,
    options: number[]
  ): Promise<SpecColorChangeFail> | Promise<SpecColorChangeSuccess> => {
    return customFetch(`/specs/colors/change`, {
      method: "get",
      params: {
        modelId,
        afterExteriorColorId: exteriorColorId,
        afterInteriorColorId: interiorColorId,
        options: options.length ? options.toString() : "",
      },
    });
  },
};
