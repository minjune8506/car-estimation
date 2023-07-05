import { ModelTrimQueryParam } from "../../types/ModelTrim";
import { ModelFilterQueryParam } from "../../types/ModelFilter";

export const CategoryKeys = {
  categoryCars: ["categoryCars"] as const,
};

export const ModelKeys = {
  filterAll: ["modelFilter"] as const,
  trimAll: ["modelTrim"] as const,
  filter: (query: ModelFilterQueryParam) =>
    [...ModelKeys.filterAll, { query }] as const,
  trim: (query: ModelTrimQueryParam) =>
    [...ModelKeys.trimAll, { query }] as const,
};
