import { ModelFilterQueryParam, ModelTypes } from "../../types/ModelFilter";
import { ModelTrim, ModelTrimQueryParam } from "../../types/ModelTrim";
import { CategoryCars } from "../../types/CarCategory";
import { customFetch } from "../../common/utils/customFetch";

export function fetchModelFilter(
  params: ModelFilterQueryParam
): Promise<ModelTypes> {
  return customFetch("/models/filter", { params });
}

export function fetchModelTrims(
  params: ModelTrimQueryParam
): Promise<ModelTrim[]> {
  return customFetch("/models/trims", { method: "get", params });
}

export function fetchCategoryCars(): Promise<CategoryCars[]> {
  return customFetch("/car/categories/cars", { method: "get" });
}
