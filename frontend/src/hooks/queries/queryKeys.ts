import { ModelFilterQueryParam } from "../../types/Model";

export const CategoryKeys = {
  all: ["carCategory"] as const,
  categoryCars: () => [...CategoryKeys.all, "cars"] as const,
};

export const ModelKeys = {
  all: ["model"] as const,
  findById: (modelId: number) => [...ModelKeys.all, { modelId }] as const,
  options: (modelId: number) =>
    [...ModelKeys.all, "options", { modelId }] as const,
  filter: (
    filter: "all" | "engine" | "mission",
    param: ModelFilterQueryParam
  ) => {
    if (filter === "all") {
      return [...ModelKeys.all, "filter", filter, param.carId] as const;
    } else if (filter === "engine") {
      return [...ModelKeys.all, "filter", filter, param.engineId] as const;
    } else {
      return [
        ...ModelKeys.all,
        "filter",
        filter,
        param.engineId,
        param.missionId,
      ] as const;
    }
  },
  trims: (engineId?: number, missionId?: number, drivingTypeId?: number) =>
    [
      ...ModelKeys.all,
      "trims",
      { engineId, missionId, drivingTypeId },
    ] as const,
  exteriorColors: (modelId: number, interiorColorId?: number) =>
    [
      ...ModelKeys.all,
      "colors",
      "exteriors",
      { modelId, interiorColorId },
    ] as const,
  interiorColors: (modelId: number, exteriorColorId?: number) =>
    [
      ...ModelKeys.all,
      "colors",
      "interiors",
      { modelId, exteriorColorId },
    ] as const,
};

export const CarKeys = {
  all: ["car"] as const,
  findById: (carId: number) => [...CarKeys.all, { carId }] as const,
  colors: (carId: number, modelId: number) =>
    [...CarKeys.all, "colors", { carId, modelId }] as const,
};

export const SpecKeys = {
  all: ["spec"] as const,
  modelSpecs: (modelId: number) => [...SpecKeys.all, { modelId }] as const,
  findByCode: (specCode: string, modelId: number) =>
    [...SpecKeys.all, { specCode, modelId }] as const,
  check: (
    modelId: number,
    specCode: string,
    interiorColorId?: number,
    exteriorColorId?: number
  ) =>
    [
      ...SpecKeys.all,
      "check",
      { modelId, specCode, interiorColorId, exteriorColorId },
    ] as const,
  optionConstraints: (modelId: number, specCode: string, optionId: number) =>
    [
      ...SpecKeys.all,
      "option",
      "constraints",
      { modelId, specCode, optionId },
    ] as const,
  changeColor: (
    modelId: number,
    beforeExteriorColorId: number,
    afterInteriorColorId: number,
    beforeInteriorColorId: number,
    afterExteriorColorId: number,
    options: number[]
  ) => [
    ...SpecKeys.all,
    "color",
    "change",
    {
      modelId,
      beforeExteriorColorId,
      afterExteriorColorId,
      beforeInteriorColorId,
      afterInteriorColorId,
      options,
    },
  ],
};
