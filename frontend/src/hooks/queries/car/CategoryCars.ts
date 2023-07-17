import { useQuery } from "@tanstack/react-query";
import { CategoryCars } from "src/types/CarCategory";
import { CategoryKeys } from "../queryKeys";
import { carAPI } from "./api";

export function useCategoryCars() {
  return useQuery<CategoryCars[], Error>(
    CategoryKeys.categoryCars(),
    carAPI.fetchCategoryCars
  );
}
