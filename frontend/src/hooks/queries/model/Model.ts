import { useQuery } from "@tanstack/react-query";
import {
  Model,
  ModelFilterQueryParam,
  ModelOptions,
  ModelTypes,
} from "src/types/Model";
import { ModelKeys } from "../queryKeys";
import { ExteriorColor, InteriorColor } from "src/types/Color";
import { modelAPI } from "./api";

export function useModelFilter(
  filter: "all" | "engine" | "mission",
  param: ModelFilterQueryParam
) {
  return useQuery<ModelTypes, Error>({
    queryKey: ModelKeys.filter(filter, param),
    queryFn: () => modelAPI.fetchModelFilter(param),
  });
}

export function useModelTrims(
  carId: number,
  engineId?: number,
  missionId?: number,
  drivingTypeId?: number,
  isReady?: number
) {
  return useQuery<Model[], Error>({
    queryKey: ModelKeys.trims(engineId, missionId, drivingTypeId),
    queryFn: () =>
      modelAPI.fetchModelTrims(carId, engineId, missionId, drivingTypeId),
    enabled: !!isReady,
  });
}

export const modelInfoQuery = (modelId: number) => ({
  queryKey: ModelKeys.findById(modelId),
  queryFn: async () => {
    const data = await modelAPI.fetchModelInfo(modelId);
    return data;
  },
});

export function useModelInfo(modelId: number) {
  return useQuery<Model, Error>({
    queryKey: ModelKeys.findById(modelId),
    queryFn: async () => {
      const data = await modelAPI.fetchModelInfo(modelId);
      return data;
    },
  });
}

export const modelOptionsQuery = (modelId: number) => ({
  queryKey: ModelKeys.options(modelId),
  queryFn: async () => {
    const data = await modelAPI.fetchModelOptions(modelId);
    return data;
  },
});

export function useModelOptions(modelId: number) {
  return useQuery<ModelOptions, Error>({
    queryKey: ModelKeys.options(modelId),
    queryFn: async () => {
      const data = await modelAPI.fetchModelOptions(modelId);
      return data;
    },
  });
}

export function useModelExteriorColors(
  modelId: number,
  interiorColorId?: number
) {
  return useQuery<ExteriorColor[], Error>({
    queryKey: ModelKeys.exteriorColors(modelId, interiorColorId),
    queryFn: async () => {
      const data = await modelAPI.fetchModelExteriorColors(
        modelId,
        interiorColorId
      );
      return data;
    },
    enabled: !!interiorColorId,
  });
}

export function useModelInteriorColors(
  modelId: number,
  exteriorColorId?: number
) {
  return useQuery<InteriorColor[], Error>({
    queryKey: ModelKeys.interiorColors(modelId, exteriorColorId),
    queryFn: async () => {
      const data = await modelAPI.fetchModelInteriorColors(
        modelId,
        exteriorColorId
      );
      return data;
    },
    enabled: !!exteriorColorId,
  });
}
