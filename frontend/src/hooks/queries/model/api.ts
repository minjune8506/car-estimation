import { customFetch } from "src/common/utils/customFetch";
import { ExteriorColor, InteriorColor } from "src/types/Color";
import {
  Model,
  ModelFilterQueryParam,
  ModelOptions,
  ModelTypes,
} from "src/types/Model";

export const modelAPI = {
  fetchModelFilter: (param: ModelFilterQueryParam): Promise<ModelTypes> => {
    return customFetch("/models/filter", {
      method: "get",
      params: param,
    });
  },
  fetchModelTrims: (
    carId: number,
    engineId?: number,
    missionId?: number,
    drivingTypeId?: number
  ): Promise<Model[]> => {
    return customFetch("/models/trims", {
      method: "get",
      params: { carId, engineId, missionId, drivingTypeId },
    });
  },
  fetchModelInfo: (modelId: number): Promise<Model> => {
    return customFetch(`/models/${modelId}`, { method: "get" });
  },
  fetchModelOptions: (modelId: number): Promise<ModelOptions> => {
    return customFetch(`/models/${modelId}/options`, { method: "get" });
  },
  fetchModelExteriorColors: (
    modelId: number,
    interiorColorId?: number
  ): Promise<ExteriorColor[]> => {
    return customFetch(`/models/${modelId}/colors/exteriors`, {
      method: "get",
      params: { interiorColorId },
    });
  },
  fetchModelInteriorColors: (
    modelId: number,
    exteriorColorId?: number
  ): Promise<InteriorColor[]> => {
    return customFetch(`/models/${modelId}/colors/interiors`, {
      method: "get",
      params: { exteriorColorId },
    });
  },
};
