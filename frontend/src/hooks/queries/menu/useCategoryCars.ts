import { ONE_HOUR } from "../../../common/constants/constants";
import { useQuery } from "@tanstack/react-query";
import { CategoryKeys } from "../queryKeys";
import { CategoryCars } from "../../../types/CarCategory";
import { fetchCategoryCars } from "../api";

export default () => {
  return useQuery<CategoryCars[], Error>(
    CategoryKeys.categoryCars,
    fetchCategoryCars,
    {
      staleTime: ONE_HOUR,
    }
  );
};
