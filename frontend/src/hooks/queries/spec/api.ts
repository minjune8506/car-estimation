import { customFetch } from "common/utils/customFetch";
import {
  ChangeExteriorColor,
  ChangeInteriorColor,
  ChangeModel,
  CheckSpec,
  CheckSpecFail,
  ConstraintCheck,
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
    beforeExteriorColorId: number,
    afterExteriorColorId: number,
    beforeInteriorColorId: number,
    afterInteriorColorId: number,
    options: number[]
  ): Promise<ChangeExteriorColor | ChangeInteriorColor | ChangeModel> => {
    return customFetch(`/specs/colors/change`, {
      method: "get",
      params: {
        modelId,
        beforeExteriorColorId,
        afterExteriorColorId,
        beforeInteriorColorId,
        afterInteriorColorId,
        options: options.length ? options.toString() : "",
      },
    });
  },
  fetchOptionConstraintCheck: (
    modelId: number,
    selectedOptions: number[],
    targetOptionId: number
  ): Promise<ConstraintCheck> => {
    return customFetch(`/specs/constraints/check`, {
      method: "get",
      params: {
        modelId,
        selectedOptions: selectedOptions.length ? selectedOptions.toString() : "",
        targetOptionId,
      },
    });
  },
};
